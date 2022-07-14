import { useModalStore } from '~/stores/modal';

import Button from '../Button';
import OrderTicketCardList from '../ticket/OrderTicketCardList';

export default function OrderListButton() {
  const { showModal } = useModalStore();

  return (
    <Button
      onClick={() => {
        showModal('판매 목록', <OrderTicketCardList />);
      }}
    >
      판매목록
    </Button>
  );
}
