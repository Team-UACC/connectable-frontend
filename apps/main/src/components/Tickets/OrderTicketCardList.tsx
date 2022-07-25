import Link from 'next/link';

import TicketCard from '~/components/Card/TicketCard';
import useTicketsByEventIdQuery from '~/hooks/apis/useTicketsByEventIdQuery';
import { useModalStore } from '~/stores/modal';

interface Props {
  eventId: number;
}

export default function OrderTicketCardList({ eventId }: Props) {
  const { data: ticketList, isLoading } = useTicketsByEventIdQuery(eventId);

  const { hideModal } = useModalStore();

  if (isLoading) return <div>loading</div>;

  return (
    <section>
      <ul className="w-full ">
        {ticketList?.map(ticketData => (
          <div key={ticketData.tokenId}>
            <Link key={ticketData.tokenId} href={`/tickets/${eventId}/${ticketData.id}`} className="relative w-full ">
              <a onClick={() => hideModal()}>
                <TicketCard
                  ticketData={ticketData}
                  type="Order"
                  className="mb-1 ease-in-out bg-transparent border-gray-300 shadow-lg cursor-pointer "
                />
              </a>
            </Link>
          </div>
        ))}
      </ul>
    </section>
  );
}
