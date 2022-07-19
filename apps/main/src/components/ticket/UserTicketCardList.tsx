import Link from 'next/link';
import { useQuery } from 'react-query';

import { fetchTicketsOwnedByUser } from '~/apis/users';

import TicketCard from './TicketCard';

export default function UserTicketCardList() {
  const { data, isLoading, error } = useQuery('userTicket', fetchTicketsOwnedByUser);

  if (error) return <div>error</div>;

  if (isLoading) return <div>loading</div>;

  return (
    <ul className="w-full divide-y-2 ">
      {data?.map(ticketData => (
        <Link
          key={ticketData.tokenId}
          href={`tickets/${ticketData.eventId}/${ticketData.tokenId}`}
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
