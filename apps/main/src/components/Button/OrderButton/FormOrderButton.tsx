// eslint-disable-next-line import/no-named-as-default
import toast from 'react-hot-toast';

import Button from '~/components/Button';
import OrderForm from '~/components/Form/OrderForm';
import LoginRequestToast from '~/components/Toast/LoginRequestToast';
import { useModalStore } from '~/stores/modal';
import { useUserStore } from '~/stores/user';

interface Props {
  amount: number;
  ticketId: number;
  eventId: number;
}

export default function FormOrderButton({ amount, ticketId, eventId }: Props) {
  const { isLoggedIn } = useUserStore();
  const { showModal } = useModalStore();

  return (
    <Button
      onClick={() => {
        if (isLoggedIn) {
          showModal('티켓 구매하기', <OrderForm amount={amount} ticketIdList={[ticketId]} eventId={eventId} />);
        } else {
          toast.error(<LoginRequestToast />);
        }
      }}
    >
      구매하기
    </Button>
  );
}
