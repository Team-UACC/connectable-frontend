import Image from 'next/image';

export function ArtistImageBox({ src }: { src: string }) {
  return (
    <div className=" relative w-[calc(100%+32px)] -translate-x-4 h-[140px] bg-gray-100">
      <div className="m-auto translate-y-[90px] max-w-fit">
        <Image src={src} width={100} height={100} className="rounded-full" />
      </div>
    </div>
  );
}

export function ArtistName({ artistName }: { artistName: string }) {
  return (
    <span className="font-bold ">
      <span className="mr-2 text-xs opacity-40">아티스트</span>
      <span className="text-sm">{artistName}</span>
    </span>
  );
}

export function RemainingTicketStatus({
  totalTicketCount,
  onSaleTicketCount,
}: {
  totalTicketCount: number;
  onSaleTicketCount: number;
}) {
  return (
    <span className="text-sm font-semibold leading-6 opacity-40">
      총 {totalTicketCount}개 중 {onSaleTicketCount}개 판매 완료
    </span>
  );
}

export function PriceText({ children }: { children: string }) {
  return (
    <div className="font-bold leading-6 text-md text-brand">
      <span className="mr-4">판매가</span>
      <span>{children}</span>
    </div>
  );
}
