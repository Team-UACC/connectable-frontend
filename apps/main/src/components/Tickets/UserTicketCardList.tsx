import Link from 'next/link';

import TicketCard from '~/components/Card/TicketCard';
import useTicketsOwnedByUserQuery from '~/hooks/apis/useTicketsOwnedByUserQuery';

export default function UserTicketCardList() {
  const { data: ticketList, isLoading, error } = useTicketsOwnedByUserQuery({ cacheTime: 0, staleTime: 0 });

  if (error) return <div>error</div>;

  if (isLoading) return <div>loading</div>;

  return (
    <ul className="w-full divide-y-2 ">
      {ticketList?.map(ticketData => (
        <Link
          key={ticketData.tokenId}
          href={`tickets/${ticketData.eventId}/${ticketData.id}`}
          className="relative w-full "
        >
          <a>
            <TicketCard
              ticketData={ticketData}
              className="transition-all cursor-pointer ease-in-out hover:rounded-lg hover:border-[#EBF8FF] hover:scale-110 hover:bg-[#EBF8FF] hover:z-10"
            />
          </a>
        </Link>
      ))}
    </ul>
  );
}
