import { KeyboardEvent, RefObject } from 'react';
// eslint-disable-next-line import/no-named-as-default
import toast from 'react-hot-toast';

import { postOrderForm } from '~/apis/orders';
import { ORDER_CODE } from '~/constants/error';
import { useModalStore } from '~/stores/modal';

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
    try {
      const response = await postOrderForm({ userName, phoneNumber, ticketIdList });

      if (response.status === 'success') {
        toast.success('제출 완료');
      } else {
        const { code } = response;
        toast.error(ORDER_CODE[code]);
      }
    } catch (e) {
      console.error(e);
      toast.error('에러가 발생했어요. 문의를 남겨주세요.');
    }

    hideModal();
  };

  return [handleKeyUp, handleClickSubmitButton];
}
