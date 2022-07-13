import Link from 'next/link';
import { useQuery } from 'react-query';

import { getUserTicket } from '~/apis/users';

import TicketCard from './TicketCard';

export default function UserTicketCardList() {
  const { data } = useQuery('userTicket', getUserTicket);

  if (!data) return <div>loading</div>;

  return (
    <ul className="w-full divide-y-2 ">
      {data.map(ticketData => (
        <>
          <Link
            key={ticketData.tokenId}
            href={`tickets/${ticketData.contractAddress}/${ticketData.tokenId}`}
            className="relative w-full "
          >
            <a>
              <TicketCard data={ticketData} />
            </a>
          </Link>
        </>
      ))}
    </ul>
  );
}
