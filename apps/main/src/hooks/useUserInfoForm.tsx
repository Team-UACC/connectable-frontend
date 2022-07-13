import { KeyboardEvent, RefObject } from 'react';

import { putUser } from '~/apis/users';
import { useModalStore } from '~/stores/modal';
import { useUserStore } from '~/stores/user';

import { formatPhoneNumber } from '../utils';

interface Props {
  userNameRef: RefObject<HTMLInputElement>;
  phoneNumberRef: RefObject<HTMLInputElement>;
}

export default function useUserInfoForm({
  userNameRef,
  phoneNumberRef,
}: Props): [(e: KeyboardEvent<HTMLInputElement>) => void, () => Promise<void>] {
  const { setIsLoggedIn, addUserState, klaytnAddress } = useUserStore();
  const { hideModal } = useModalStore();

  const onKeyUpPhoneNumberInput = (e: KeyboardEvent<HTMLInputElement>) => {
    e.currentTarget.value = formatPhoneNumber(e.currentTarget.value);
  };

  const onClickSubmitButton = async () => {
    const phoneNumber = phoneNumberRef.current!.value;
    const nickname = userNameRef.current!.value;

    const data = await putUser(nickname, phoneNumber);

    if (data.status === 'success') {
      setIsLoggedIn(true);
      addUserState(nickname, klaytnAddress, phoneNumber);
      hideModal();
    }
  };

  return [onKeyUpPhoneNumberInput, onClickSubmitButton];
}
