import { useState } from 'react';
// eslint-disable-next-line import/no-named-as-default
import toast from 'react-hot-toast';

import TicketCard from '~/components/Card/TicketCard';
import useTicketsByEventIdQuery from '~/hooks/apis/useTicketsByEventIdQuery';
import { useModalStore } from '~/stores/modal';
import { useUserStore } from '~/stores/user';

import Button from '../Button';
import StickyBlurFooter from '../Footer/StickyBlurFooter';
import OrderForm from '../Form/OrderForm';

interface Props {
  eventId: number;
}

const toggleSet = (element: any) => (set: Set<any>) => {
  set.has(element) ? set.delete(element) : set.add(element);
  return new Set([...set]);
};

export default function OrderTicketCardList({ eventId }: Props) {
  const { data: ticketList, isLoading } = useTicketsByEventIdQuery(eventId, { staleTime: 0 });
  const [checkedSet, setCheckedSet] = useState(new Set<number>());

  const { isLoggedIn } = useUserStore();
  const { showModal } = useModalStore();

  if (isLoading) return <div>loading...</div>;

  return (
    <>
      <section className="relative ">
        <ul className="w-full ">
          {ticketList?.map(ticketData => (
            <div
              key={ticketData.tokenId}
              className={
                `relative px-2 flex w-full bg-transparent cursor-pointer shadow-lg hover:rounded-lg [@media(hover:hover)]:hover:bg-[#EBF8FF] transition-all ease-in-out ` +
                (checkedSet.has(ticketData.id) ? `bg-[#EBF8FF] ` : '') +
                (ticketData.ticketSalesStatus !== 'ON_SALE'
                  ? ` opacity-50 [@media(hover:hover)]:hover:bg-transparent `
                  : '')
              }
            >
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  className="text-indigo-600 form-checkbox"
                  checked={checkedSet.has(ticketData.id)}
                  disabled={ticketData.ticketSalesStatus !== 'ON_SALE'}
                  onChange={() => setCheckedSet(toggleSet(ticketData.id))}
                />
              </label>
              <div
                onClick={() => ticketData.ticketSalesStatus === 'ON_SALE' && setCheckedSet(toggleSet(ticketData.id))}
              >
                <TicketCard
                  key={ticketData.tokenId}
                  ticketData={ticketData}
                  eventId={eventId}
                  type="Order"
                  className="mb-1 min-w-[min(360px,80vw)] "
                />
              </div>
            </div>
          ))}
        </ul>
        <StickyBlurFooter className="w-full">
          <Button
            className="sticky bottom-0 -translate-x-1/2 left-1/2 "
            disabled={checkedSet.size === 0}
            onClick={() => {
              if (isLoggedIn) {
                showModal(
                  '공연 예매하기',
                  <OrderForm
                    amount={ticketList!.reduce((total, v) => (checkedSet.has(v.id) ? total + v.price : total), 0)}
                    ticketIdList={[...checkedSet]}
                  />
                );
              } else {
                toast.error('로그인 후 이용해주세요.');
              }
            }}
          >
            {`티켓 ${checkedSet.size}장 ` + '구매하기'}
          </Button>
        </StickyBlurFooter>
      </section>
    </>
  );
}
