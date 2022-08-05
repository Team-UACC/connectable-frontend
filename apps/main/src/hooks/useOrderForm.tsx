import { AxiosError } from 'axios';
import { KeyboardEvent, RefObject } from 'react';
// eslint-disable-next-line import/no-named-as-default
import toast from 'react-hot-toast';

import { postOrderForm } from '~/apis/orders';
import { useModalStore } from '~/stores/modal';
import { ErrorResponse400 } from '~/types/errorType';

import { formatPhoneNumber } from '../utils';

interface Props {
  userNameRef: RefObject<HTMLInputElement>;
  phoneNumberRef: RefObject<HTMLInputElement>;
  ticketIdList: Array<number>;
}

export default function useOrderForm({
  userNameRef,
  phoneNumberRef,
  ticketIdList,
}: Props): [(e: KeyboardEvent<HTMLInputElement>) => void, () => Promise<void>] {
  const { hideModal } = useModalStore();

  const handleKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
    e.currentTarget.value = formatPhoneNumber(e.currentTarget.value);
  };

  const handleClickSubmitButton = async () => {
    const phoneNumber = phoneNumberRef.current!.value;
    const userName = userNameRef.current!.value;

    // form 데이터 제출
    const submitPromise = postOrderForm({ userName, phoneNumber, ticketIdList });
    toast.promise(submitPromise, {
      loading: 'loading...',
      success: '성공적으로 반영되었습니다.',
      error: (err: AxiosError<ErrorResponse400>) => <div className="text-center">{err.response?.data.message}</div>,
    });

    hideModal();
  };

  return [handleKeyUp, handleClickSubmitButton];
}
