import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import Button from '~/components/Button';
import { IMAGE_BLUR_DATA_URL } from '~/constants/contents';
import { Ticket } from '~/types/ticketType';
import { dayjsKO } from '~/utils/day';

interface Props {
  ticketData: Ticket;
  eventId?: number;
  className?: string;
  type?: 'Order' | 'Default';
}

export default function TicketCard({ ticketData, className, type = 'Default' }: Props) {
  const router = useRouter();

  if (!ticketData.metadata) return null;

  return (
    <article className={'relative justify-between items-center flex w-full px-2 py-4 ' + className}>
      <Image
        src={ticketData.metadata.image}
        alt="티켓 이미지"
        width={100}
        height={100}
        layout="fixed"
        objectFit="cover"
        className="rounded-[10px] shadow-lg flex-shrink-0  "
        placeholder="blur"
        blurDataURL={IMAGE_BLUR_DATA_URL}
      />
      <div className="flex flex-col text-start ml-5 w-[calc(100%-120px)] ">
        <h2 className="font-bold ">{ticketData.metadata.name}</h2>
        {type === 'Order' ? (
          <>
            <div className="flex flex-col gap-2 mt-4 ">
              <span className="mb-2 text-sm font-semibold text-brand">
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
            <Link href={`/events/${router.query.eventId}/sales?ticketId=${ticketData.id}`} shallow={true}>
              <Button
                onClick={e => {
                  e.stopPropagation();
                }}
                className="absolute text-xs bottom-[1.5em] right-[1rem] px-[0.75rem]"
              >
                <a>상세정보</a>
              </Button>
            </Link>
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
