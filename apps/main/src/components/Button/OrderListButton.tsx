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
    <Button>
      <Link href={`/events/${eventId}/sales`} passHref>
        <a>티켓 구매하기</a>
      </Link>
    </Button>
  );
}
