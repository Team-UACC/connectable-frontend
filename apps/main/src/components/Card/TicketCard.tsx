import Image from 'next/image';

import Button from '~/components/Button';
import { Ticket } from '~/types/ticketType';
import { dayjsKO } from '~/utils/day';

interface Props {
  ticketData: Ticket;
  className?: string;
  type?: 'Order' | 'Default';
}

export default function TicketCard({ ticketData, className, type = 'Default' }: Props) {
  if (!ticketData.metadata) return null;

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
            <span className="mt-8 text-sm font-semibold text-brand">
              판매가{'   '}
              {ticketData.price.toLocaleString('ko-KR')}원
            </span>
            <Button className="absolute px-3 text-xs -translate-y-1/2 top-1/2 right-[1rem]">구매하기</Button>
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
