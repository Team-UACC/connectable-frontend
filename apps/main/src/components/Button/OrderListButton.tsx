import Button from '~/components/Button';
import OrderTicketCardList from '~/components/Ticket/OrderTicketCardList';
import { useModalStore } from '~/stores/modal';

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
