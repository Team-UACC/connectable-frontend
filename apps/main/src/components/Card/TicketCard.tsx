import Image from 'next/image';
import Link from 'next/link';

import Button from '~/components/Button';
import { useModalStore } from '~/stores/modal';
import { Ticket } from '~/types/ticketType';
import { dayjsKO } from '~/utils/day';

import TicketDetailForm from '../Form/TicketDetailForm';

interface Props {
  ticketData: Ticket;
  eventId?: number;
  className?: string;
  type?: 'Order' | 'Default';
}

export default function TicketCard({ ticketData, className, type = 'Default', eventId }: Props) {
  if (!ticketData.metadata) return null;

  const { showModal } = useModalStore();

  return (
    <article className={'relative flex w-full px-2 py-4 ' + className}>
      <Image
        src={ticketData.metadata.image}
        alt="티켓 이미지"
        width={100}
        height={100}
        objectFit="cover"
        className="rounded-[10px] shadow-lg"
      />
      <div className="flex flex-col ml-8 h-[100px] text-start">
        <h2 className="font-bold ">{ticketData.metadata.name}</h2>
        {type === 'Order' ? (
          <>
            <div className="flex flex-col gap-2 mt-4 ">
              <span className="text-sm font-semibold text-brand">
                판매가{'   '}
                {ticketData.price.toLocaleString('ko-KR')}원
              </span>
              <span className="text-sm font-semibold text-red">
                {ticketData.ticketSalesStatus === 'ON_SALE'
                  ? '판매중'
                  : ticketData.ticketSalesStatus === 'PENDING'
                  ? '승인 대기중'
                  : '판매 완료'}
              </span>
            </div>
            <Button
              onClick={e => {
                e.stopPropagation();

                showModal('NFT 티켓', <TicketDetailForm eventId={Number(eventId)} ticketId={ticketData.id} />);
              }}
              className="absolute text-xs bottom-[1.5em] right-[1rem] px-[0.75rem]"
            >
              상세정보
            </Button>
          </>
        ) : (
          <>
            <span className="mb-4 text-sm font-semibold ">@{ticketData.artistName}</span>
            <span className="text-xs font-semibold opacity-50">
              {dayjsKO(ticketData.eventDate).format('YYYY년 MM월 DD일')}
            </span>

            <Link href={`/tickets/${ticketData.eventId}/${ticketData.id}`}>
              <Button className="absolute text-xs bottom-[1.5em] right-[1rem] px-[0.75rem]">상세정보</Button>
            </Link>
          </>
        )}
      </div>
    </article>
  );
}
