import { useQuery } from 'react-query';

import { getUserTicket } from '~/apis/users';

import TicketCard from './TicketCard';

export default function UserTicketCardList() {
  const { data } = useQuery('userTicket', getUserTicket);

  if (!data) return <div>loading</div>;

  return (
    <ul className="divide-y-2 ">
      {data.tickets.map(ticketData => (
        <TicketCard data={ticketData} key={ticketData.tokenId} />
      ))}
    </ul>
  );
}
