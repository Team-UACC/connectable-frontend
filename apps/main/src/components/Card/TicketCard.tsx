import Image from 'next/image';
import Link from 'next/link';

import Button from '~/components/Button';
import { useModalStore } from '~/stores/modal';
import { Ticket } from '~/types/ticketType';
import { dayjsKO } from '~/utils/day';

interface Props {
  ticketData: Ticket;
  eventId?: number;
  className?: string;
  type?: 'Order' | 'Default';
}

export default function TicketCard({ ticketData, className, type = 'Default', eventId }: Props) {
  if (!ticketData.metadata) return null;

  const { hideModal } = useModalStore();

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
      <div className="flex flex-col justify-between ml-8 h-[100px] text-start">
        <h2 className="text-lg font-bold ">{ticketData.metadata.name}</h2>
        {type === 'Order' ? (
          <>
            <div className="flex flex-col gap-2 ">
              <span className="text-sm font-semibold text-brand">
                판매가{'   '}
                {ticketData.price.toLocaleString('ko-KR')}원
              </span>
              <span className="text-sm font-semibold text-red">
                {ticketData.onSale === 'ON_SALE'
                  ? '판매중'
                  : ticketData.onSale === 'PENDING'
                  ? '판매 대기중'
                  : '판매 완료'}
              </span>
            </div>
            <Link href={`/tickets/${eventId}/${ticketData.id}`}>
              <a
                onClick={e => {
                  e.stopPropagation();
                  hideModal();
                }}
              >
                <Button className="absolute text-xs bottom-[1.5em] right-[0.25rem]">상세정보</Button>
              </a>
            </Link>
          </>
        ) : (
          <>
            <span className="mb-4 text-sm font-semibold ">{ticketData.artistName}</span>
            <span className="text-sm font-semibold opacity-50">
              {dayjsKO(ticketData.eventDate).format('YYYY년 MM월 DD일')}
            </span>
          </>
        )}
      </div>
    </article>
  );
}
