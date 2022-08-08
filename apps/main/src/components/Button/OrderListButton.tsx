import Link from 'next/link';

import Button from '~/components/Button';

interface Props {
  eventId: number;
}

export default function OrderListButton({ eventId }: Props) {
  return (
    <Link href={`/events/${eventId}/sales`} passHref>
      <Button>티켓 구매하기</Button>
    </Link>
  );
}
