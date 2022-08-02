import _ from 'lodash';
import { ChangeEvent, Dispatch, RefObject, SetStateAction, useState } from 'react';
import toast from 'react-hot-toast';

import { updateUser, userValidation } from '~/apis/users';
import { NICKNAME_REGEX, PHONE_NUMBER_REGEX } from '~/constants/regex';
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
  setValidationNickName: Dispatch<SetStateAction<boolean | 'OVERLAP'>>;
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

    const submitPromise = updateUser(nickname, phoneNumber);

    toast.promise(submitPromise, {
      loading: 'loading...',
      success: () => {
        setIsLoggedIn(true);
        addUserState(nickname, klaytnAddress, phoneNumber);
        hideModal();
        return '성공적으로 반영되었습니다.';
      },
      error: '에러가 발생했습니다. 다시 시도해주세요.',
    });
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
    setValidationNickName,
    setValidationPhoneNumber,
  };
}
