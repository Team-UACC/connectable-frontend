import { useRouter } from 'next/router';

export default function TicketDetail() {
  const router = useRouter();
  const { eventName, tokenId } = router.query;

  return (
    <p>
      EventName: {eventName} & TokenId: {tokenId}
    </p>
  );
}
