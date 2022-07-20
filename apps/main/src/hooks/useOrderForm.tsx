import { KeyboardEvent, RefObject } from 'react';
// eslint-disable-next-line import/no-named-as-default
import toast from 'react-hot-toast';

import { postOrderForm } from '~/apis/orders';
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
}: Props): [(e: KeyboardEvent<HTMLInputElement>) => void, () => Promise<void>] {
  const { hideModal } = useModalStore();

  const handleKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
    e.currentTarget.value = formatPhoneNumber(e.currentTarget.value);
  };

  const handleClickSubmitButton = async () => {
    const phoneNumber = phoneNumberRef.current!.value;
    const userName = userNameRef.current!.value;
    const agreement = agreementRef.current!.value === '동의';
    const numberOfPeople = Number(numberOfPeopleRef.current!.value);

    // form 데이터 제출
    const response = await postOrderForm({ userName, phoneNumber, agreement, numberOfPeople });

    if (response.status === 'success') {
      toast.success('제출 완료');
    }

    hideModal();
  };

  return [handleKeyUp, handleClickSubmitButton];
}
