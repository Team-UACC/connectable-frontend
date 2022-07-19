import Link from 'next/link';
import { useQuery } from 'react-query';

import { fetchEventsAllTickets } from '~/apis/events';
import { useModalStore } from '~/stores/modal';

import TicketCard from './TicketCard';

interface Props {
  eventId: string;
}

export default function OrderTicketCardList({ eventId }: Props) {
  const { data: ticketList } = useQuery('allTickets', () => fetchEventsAllTickets(eventId));

  const { hideModal } = useModalStore();

  if (!ticketList) return <div>loading</div>;

  return (
    <section>
      <ul className="w-full ">
        {ticketList.map(ticketData => (
          <Link
            key={ticketData.tokenId}
            href={`/tickets/${eventId}/${ticketData.tokenId}`}
            className="relative w-full "
          >
            <a onClick={() => hideModal()}>
              <TicketCard
                ticketData={ticketData}
                type="Order"
                className="mb-1 ease-in-out bg-transparent border-gray-300 shadow-lg cursor-pointer "
              />
            </a>
          </Link>
        ))}
      </ul>
    </section>
  );
}
