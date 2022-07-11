import { useRouter } from 'next/router';

export default function TicketDetail() {
  const router = useRouter();
  const { contractAddress, tokenId } = router.query;

  return (
    <div>
      contractAddress: {contractAddress} & TokenId: {tokenId}
    </div>
  );
}
