import Link from 'next/link';

import Button from '~/components/Button';
import useTicketsByEventIdQuery from '~/hooks/apis/useTicketsByEventIdQuery';

interface Props {
  eventId: number;
}

export default function OrderListButton({ eventId }: Props) {
  // prefetch
  useTicketsByEventIdQuery(Number(eventId), { staleTime: 1000 * 10 });

  return (
    <Link href={`/events/${eventId}/sales`} passHref>
      <Button>티켓 구매하기</Button>
    </Link>
  );
}
