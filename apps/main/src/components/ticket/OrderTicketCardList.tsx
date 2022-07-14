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
    <section className=" max-h-[80vh] overflow-scroll">
      <ul className="w-full divide-y-2 ">
        {data.map(ticketData => (
          <Link
            key={ticketData.tokenId}
            href={`/tickets/${ticketData.eventId}/${ticketData.tokenId}`}
            className="relative w-full "
          >
            <a onClick={() => hideModal()}>
              <TicketCard
                data={ticketData}
                className="transition-all ease-in-out cursor-pointer hover:rounded-lg hover:bg-blue-50 hover:z-10"
              />
            </a>
          </Link>
        ))}
      </ul>
    </section>
  );
}
