import Link from 'next/link';
import { useEffect } from 'react';
import { useQueryClient } from 'react-query';

import Button from '~/components/Button';
import { prefetchTicketsByEventIdQuery } from '~/hooks/apis/useTicketsByEventIdQuery';

interface Props {
  eventId: number;
}

export default function OrderListButton({ eventId }: Props) {
  const queryClient = useQueryClient();

  useEffect(() => {
    prefetchTicketsByEventIdQuery(queryClient, Number(eventId));
  }, []);

  return (
    <Link href={`/events/${eventId}/sales`} passHref>
      <Button>티켓 구매하기</Button>
    </Link>
  );
}
