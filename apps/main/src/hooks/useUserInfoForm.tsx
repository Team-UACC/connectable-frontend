import _ from 'lodash';
import { ChangeEvent, Dispatch, RefObject, SetStateAction, useState } from 'react';

import { NICKNAME_REGEX, PHONE_NUMBER_REGEX } from 'src/constants/regex';
import { updateUser, userValidation } from '~/apis/users';
import { useModalStore } from '~/stores/modal';
import { useUserStore } from '~/stores/user';

import { formatPhoneNumber } from '../utils';

interface Props {
  userNameRef: RefObject<HTMLInputElement>;
  phoneNumberRef: RefObject<HTMLInputElement>;
}

interface Ret {
  handleChangePhoneNumberInput: (e: ChangeEvent<HTMLInputElement>) => void;
  handleClickSubmitButton: () => Promise<void>;
  handleChangeNickNameInput: (e: ChangeEvent<HTMLInputElement>) => void;
  validationNickName: boolean | 'OVERLAP';
  validationPhoneNumber: boolean;
  setValidationPhoneNumber: Dispatch<SetStateAction<boolean>>;
}

export default function useUserInfoForm({ userNameRef, phoneNumberRef }: Props): Ret {
  const { setIsLoggedIn, addUserState, klaytnAddress } = useUserStore();
  const { hideModal } = useModalStore();

  const [validationNickName, setValidationNickName] = useState<boolean | 'OVERLAP'>(false);
  const [validationPhoneNumber, setValidationPhoneNumber] = useState(false);

  const handleChangePhoneNumberInput = (e: ChangeEvent<HTMLInputElement>) => {
    e.currentTarget.value = formatPhoneNumber(e.currentTarget.value);
    setValidationPhoneNumber(PHONE_NUMBER_REGEX.test(e.currentTarget.value));
  };

  const handleClickSubmitButton = async () => {
    if (validationNickName !== true || validationPhoneNumber !== true) return;

    const phoneNumber = phoneNumberRef.current!.value;
    const nickname = userNameRef.current!.value;

    const data = await updateUser(nickname, phoneNumber);

    if (data.status === 'success') {
      setIsLoggedIn(true);
      addUserState(nickname, klaytnAddress, phoneNumber);
      hideModal();
    }
  };

  const debouncedNickNameValidation = _.debounce(async (value: string) => {
    if (NICKNAME_REGEX.test(value) === false) {
      setValidationNickName(false);
      return;
    }

    const { available } = await userValidation({ nickname: value });
    setValidationNickName(available ? true : 'OVERLAP');
  }, 100);

  const handleChangeNickNameInput = async (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target as HTMLInputElement;
    debouncedNickNameValidation(value);
  };

  return {
    handleChangePhoneNumberInput,
    handleClickSubmitButton,
    handleChangeNickNameInput,
    validationNickName,
    validationPhoneNumber,
    setValidationPhoneNumber,
  };
}
