import { useState } from 'react';

import TicketCard from '~/components/Card/TicketCard';
import useTicketsByEventIdQuery from '~/hooks/apis/useTicketsByEventIdQuery';
import { useModalStore } from '~/stores/modal';

import Button from '../Button';
import OrderForm from '../Form/OrderForm';

interface Props {
  eventId: number;
}

const toggleSet = (element: any) => (set: Set<any>) => {
  set.has(element) ? set.delete(element) : set.add(element);
  return new Set([...set]);
};

export default function OrderTicketCardList({ eventId }: Props) {
  const { data: ticketList, isLoading } = useTicketsByEventIdQuery(eventId);
  const [checkedSet, setCheckedSet] = useState(new Set<number>());

  const { showModal } = useModalStore();

  if (isLoading) return <div>loading</div>;

  return (
    <>
      <section className="relative ">
        <ul className="w-full ">
          {ticketList?.map(ticketData => (
            <div key={ticketData.tokenId} className="relative flex w-full bg-transparent shadow-lg">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  className="text-indigo-600 form-checkbox"
                  checked={checkedSet.has(ticketData.id)}
                  onClick={() => setCheckedSet(toggleSet(ticketData.id))}
                />
              </label>
              <div onClick={() => setCheckedSet(toggleSet(ticketData.id))}>
                <TicketCard
                  key={ticketData.tokenId}
                  ticketData={ticketData}
                  eventId={eventId}
                  type="Order"
                  className="mb-1 ml-2 cursor-pointer min-w-[min(360px,80vw)]"
                />
              </div>
            </div>
          ))}
        </ul>
      </section>
      <Button
        className="absolute bottom-[5vh] translate-y-1/2 -translate-x-1/2 left-1/2 "
        disabled={checkedSet.size === 0}
        onClick={() => {
          showModal(
            '공연 예매하기',
            <OrderForm
              amount={ticketList!.reduce((total, v) => (checkedSet.has(v.id) ? total + v.price : total), 0)}
              ticketIdList={[...checkedSet]}
            />
          );
        }}
      >
        {`티켓 ${checkedSet.size}장 ` + '구매하기'}
      </Button>
    </>
  );
}
