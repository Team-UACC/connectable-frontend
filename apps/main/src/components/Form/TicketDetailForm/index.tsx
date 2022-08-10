import Link from 'next/link';
import { useRef } from 'react';

import Button from '~/components/Button';
import FormOrderButton from '~/components/Button/OrderButton/FormOrderButton';
import TicketDetailArticle from '~/components/Tickets/TicketDetailArticle';
import useEventByIdQuery from '~/hooks/apis/useEventByIdQuery';
import useTicketByIdsQuery from '~/hooks/apis/useTicketByIdsQuery';

interface Props {
  eventId: number;
  ticketId: number;
}

export default function TicketDetailForm({ eventId, ticketId }: Props) {
  const { data: ticketDetail, isLoading: ticketDetailLoading } = useTicketByIdsQuery(eventId, ticketId, {
    staleTime: 0,
    cacheTime: 0,
  });

  const { data: eventDetail, isLoading: eventDetailLoading } = useEventByIdQuery(eventId, {
    staleTime: 0,
    cacheTime: 0,
  });

  const containterRef = useRef(null);

  if (ticketDetailLoading || eventDetailLoading) {
    return <span>loading...</span>;
  }

  if (!ticketDetail || !eventDetail) {
    return <span>알 수 없는 에러가 발생했습니다. 다시 시도해 주세요.</span>;
  }

  return (
    <div ref={containterRef} className="w-full scale-90 -translate-y-[5rem] text-start">
      <TicketDetailArticle ticketDetail={ticketDetail} eventDetail={eventDetail} />

      <div className="flex translate-y-[5rem] items-center justify-between ">
        {ticketDetail.ticketSalesStatus === 'ON_SALE' && (
          <FormOrderButton amount={ticketDetail.price} ticketId={ticketDetail.id} eventId={eventDetail.id} />
        )}

        <Link href={`/tickets/${eventDetail.id}/${ticketDetail.id}`} passHref>
          <a className="m-auto ">
            <Button>상세 페이지로 이동하기</Button>
          </a>
        </Link>
      </div>
    </div>
  );
}
