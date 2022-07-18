import { KeyboardEvent, RefObject } from 'react';
import toast from 'react-hot-toast';

import { useModalStore } from '~/stores/modal';

import { formatPhoneNumber } from '../utils';

interface Props {
  userNameRef: RefObject<HTMLInputElement>;
  phoneNumberRef: RefObject<HTMLInputElement>;
  agreementRef: RefObject<HTMLInputElement>;
  numberOfPeopleRef: RefObject<HTMLInputElement>;
  depositCheckRef: RefObject<HTMLInputElement>;
}

export default function useOrderForm({
  userNameRef,
  phoneNumberRef,
  agreementRef,
  numberOfPeopleRef,
  depositCheckRef,
}: Props): [(e: KeyboardEvent<HTMLInputElement>) => void, () => Promise<void>] {
  const { hideModal } = useModalStore();

  const handleKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
    e.currentTarget.value = formatPhoneNumber(e.currentTarget.value);
  };

  const handleClickSubmitButton = async () => {
    const phoneNumber = phoneNumberRef.current!.value;
    const nickname = userNameRef.current!.value;
    const agreement = agreementRef.current!.value;
    const numberOfPeople = numberOfPeopleRef.current!.value;
    const depositCheck = depositCheckRef.current!.value;

    // form 데이터 제출

    toast.success('제출 완료');
    hideModal();
  };

  return [handleKeyUp, handleClickSubmitButton];
}
