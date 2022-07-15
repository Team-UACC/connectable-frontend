import Link from 'next/link';
import { useQuery } from 'react-query';

import { getUserTicket } from '~/apis/users';
import { useModalStore } from '~/stores/modal';

import TicketCard from './TicketCard';

export default function OrderTicketCardList() {
  const { data } = useQuery('userTicket', getUserTicket);

  const { hideModal } = useModalStore();

  if (!data) return <div>loading</div>;

  return (
    <section>
      <ul className="w-full ">
        {data.map(ticketData => (
          <Link
            key={ticketData.tokenId}
            href={`/tickets/${ticketData.eventId}/${ticketData.tokenId}`}
            className="relative w-full "
          >
            <a onClick={() => hideModal()}>
              <TicketCard
                data={ticketData}
                className="mb-1 ease-in-out bg-transparent border-gray-300 shadow-lg cursor-pointer "
              />
            </a>
          </Link>
        ))}
      </ul>
    </section>
  );
}
