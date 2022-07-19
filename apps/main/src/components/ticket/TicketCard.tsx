import Image from 'next/image';

import { TicketType } from '~/types/ticketType';
import { dayjsKO } from '~/utils/day';

interface Props {
  data: TicketType;
  className?: string;
}

export default function TicketCard({ data, className }: Props) {
  if (!data.metadata) return null;

  return (
    <article className={'relative flex justify-between w-full px-2 py-4 ' + className}>
      <Image
        src={data.metadata.image}
        alt="티켓 이미지"
        width={100}
        height={100}
        objectFit="cover"
        className=" rounded-[10px] shadow-lg"
      />
      <div className="flex relative flex-col w-[calc(100%-132px)] h-[100px] justify-between">
        <h2 className="text-lg font-bold ">{data.metadata.name}</h2>
        <span className="mb-4 font-semibold ">{data.artistName}</span>
        <span className="text-sm font-semibold opacity-50">{dayjsKO(data.eventDate).format('YYYY년 MM월 DD일')}</span>
      </div>
    </article>
  );
}
