import { AxiosError } from 'axios';
import { MouseEvent, RefObject } from 'react';
// eslint-disable-next-line import/no-named-as-default
import toast from 'react-hot-toast';
import { useQueryClient } from 'react-query';

import { postOrderForm } from '~/apis/orders';
import OrderFormSuccessToast from '~/components/Toast/OrderFormSuccessToast';
import queryKeys from '~/constants/queryKeys';
import { useModalStore } from '~/stores/modal';
import { useUserStore } from '~/stores/user';
import { ErrorResponse400 } from '~/types/errorType';

interface Props {
  userNameRef: RefObject<HTMLInputElement>;
  ticketIdList: Array<number>;
  eventId: number;
}

export default function useOrderForm({
  userNameRef,
  ticketIdList,
  eventId,
}: Props): [(e: MouseEvent<HTMLButtonElement>) => void] {
  const queryClient = useQueryClient();

  const { phoneNumber } = useUserStore();
  const { hideModal } = useModalStore();

  const handleClickSubmitButton = (e: MouseEvent<HTMLButtonElement>) => {
    const currentButton = e.currentTarget;
    const defaultText = currentButton.innerText;

    const userName = userNameRef.current!.value;
    // form 데이터 제출

    const submitPromise = postOrderForm({ userName, phoneNumber, ticketIdList });

    currentButton.disabled = true;
    currentButton.innerText = '...';
    currentButton.style.opacity = '0.5';

    toast.promise(submitPromise, {
      loading: 'loading...',
      success: () => {
        queryClient.invalidateQueries(queryKeys.tickets.byEventId(eventId));

        hideModal();
        return <OrderFormSuccessToast />;
      },
      error: (err: AxiosError<ErrorResponse400>) => {
        currentButton.disabled = false;
        currentButton.innerText = defaultText;
        currentButton.style.opacity = '1';

        return <div className="text-center">{err.response?.data.message}</div>;
      },
    });
  };

  return [handleClickSubmitButton];
}
