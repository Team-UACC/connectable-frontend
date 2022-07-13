import Image from 'next/image';
import Link from 'next/link';

import { TicketType } from '~/types/ticketType';

interface Props {
  data: TicketType;
}

export default function TicketCard({ data }: Props) {
  return (
    <Link href={`tickets/${data.contractAddress}/${data.tokenId}`} className="relative w-full ">
      <article className="relative flex w-full justify-between px-2 py-4 transition-all cursor-pointer ease-in-out hover:rounded-lg hover:border-[#EBF8FF] hover:scale-110 hover:bg-[#EBF8FF] hover:z-10 ">
        <Image
          src={data.metadata.image}
          alt="티켓 이미지"
          width={100}
          height={100}
          className=" rounded-[10px] shadow-lg"
        />
        <div className="flex relative flex-col w-[calc(100%-132px)] h-[100px] justify-between">
          <h2 className="text-lg font-bold ">{data.metadata.name}</h2>
          <span className="mb-4 text-sm font-semibold ">{data.artistName}</span>
          <span className="text-sm font-semibold opacity-50">{`2022년 11월 18일`}</span>
        </div>
      </article>
    </Link>
  );
}
