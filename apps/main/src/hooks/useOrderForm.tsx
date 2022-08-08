import { AxiosError } from 'axios';
import { KeyboardEvent, MouseEvent, RefObject } from 'react';
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
}: Props): [(e: KeyboardEvent<HTMLInputElement>) => void, (e: MouseEvent<HTMLButtonElement>) => Promise<void>] {
  const { hideModal } = useModalStore();

  const handleKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
    e.currentTarget.value = formatPhoneNumber(e.currentTarget.value);
  };

  const handleClickSubmitButton = async (e: MouseEvent<HTMLButtonElement>) => {
    const phoneNumber = phoneNumberRef.current!.value;
    const userName = userNameRef.current!.value;

    const currentButton = e.currentTarget;
    const defaultText = currentButton.innerText;

    currentButton.disabled = true;
    currentButton.innerText = '...';
    currentButton.style.opacity = '0.5';

    // form 데이터 제출
    const submitPromise = postOrderForm({ userName, phoneNumber, ticketIdList });
    toast.promise(
      submitPromise,
      {
        loading: 'loading...',
        success: () => {
          hideModal();
          return '성공적으로 반영되었습니다.';
        },
        error: (err: AxiosError<ErrorResponse400>) => {
          currentButton.disabled = false;
          currentButton.innerText = defaultText;
          currentButton.style.opacity = '1';

          return <div className="text-center">{err.response?.data.message}</div>;
        },
      },
      { duration: 3000 }
    );
  };

  return [handleKeyUp, handleClickSubmitButton];
}
