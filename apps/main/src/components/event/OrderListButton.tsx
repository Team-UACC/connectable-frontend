import { useModalStore } from '~/stores/modal';

import Button from '../Button';
import OrderTicketCardList from '../ticket/OrderTicketCardList';

interface Props {
  eventId: string;
}

export default function OrderListButton({ eventId }: Props) {
  const { showModal } = useModalStore();

  return (
    <Button
      onClick={() => {
        showModal('판매 목록', <OrderTicketCardList eventId={eventId} />);
      }}
    >
      판매목록
    </Button>
  );
}
