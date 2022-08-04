import Image from 'next/image';

import Text from '~/components/Text';

export function ArtistImageBox({ src }: { src: string }) {
  return (
    <div className=" relative w-[calc(100%+2rem)] -translate-x-4 h-[140px] bg-gray-100">
      <div className="m-auto translate-y-[90px] max-w-fit">
        <Image src={src} width={100} height={100} objectFit="cover" className="rounded-full" />
      </div>
    </div>
  );
}

export function ArtistName({ artistName }: { artistName: string }) {
  return (
    <div>
      <Text weight="bold" size="xs" className="mr-2 opacity-40">
        아티스트
      </Text>
      <Text weight="bold">{artistName}</Text>
    </div>
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
    <Text weight="semibold" className=" opacity-40">
      총 {totalTicketCount}개 중 {totalTicketCount - onSaleTicketCount}개 판매 완료
    </Text>
  );
}

export function PriceText({ children }: { children: string }) {
  return (
    <div>
      <Text size="base" weight="bold" className="mr-4">
        판매가
      </Text>
      <Text size="base" weight="bold">
        {children}
      </Text>
    </div>
  );
}
