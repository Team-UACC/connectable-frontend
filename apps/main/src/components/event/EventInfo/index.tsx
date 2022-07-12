import Image from 'next/image';
import { useState } from 'react';

import { Block } from '~/components/Block';
import EventSaleTimer from '~/components/event/EventSaleTimer';
import { dayjsKO } from '~/utils/day';

import LinkBox from './LinkBox';
import TextInfo from './TextInfo';

interface EventInfoProps {
  eventId: number;
}

interface GetEventRes {
  data: {
    id: number;
    name: string;
    image: string;
    date: number;
    description: string;
    salesFrom: number;
    salesTo: number;
    twitterUrl: string;
    instagramUrl: string;
    webpageUrl: string;
    totalTicketCount: number;
    onSaleTicketCount: number;
    startTime: number;
    endTime: number;
    salesOption: string;
  };
}

const EVENT = {
  data: {
    id: 1,
    image:
      'https://assets.otherside.xyz/otherdeeds/871079decce602d36188f532fe6623a15d8c6817ecd3bcd9b0c3a2933bb51c3b.jpg',
    name: '밤 하늘의 별',
    date: new Date('2022-07-22').getTime(),
    description:
      '별이 빛나는 세상을 걸어가고 있는 호랑이의 모습은 우리 삶의 모습으로 비유합니다. 빛나는 세계를 가슴 속에 품고 보이지 않고 뚜렷하지 않는 세상을 걸어가지만, 세상의 달빛은 내 눈과 가슴속 구슬에도 또렷이 맺혀 있습니다. 두 개의 달이 함께 하는 이곳은 현실의 공간을 넘어 어딘가로, 저마다 마음속에 품고 있는 길을 우린 언제나 걷고 있습니다. 달빛의 끝에서 나를 만나고, 저마다 품고 있는 희망을 발견할 수 있기를 희망합니다.',
    salesFrom: new Date('2022-07-11').getTime(),
    salesTo: new Date('2022-07-16').getTime(),
    twitterUrl: 'https://twitter.com/elonmusk',
    instagramUrl: 'https://www.instagram.com/eunbining0904/',
    webpageUrl: 'https://nextjs.org/',
    totalTicketCount: 20,
    onSaleTicketCount: 6,
    startTime: new Date('2022-07-22 19:30').getTime(),
    endTime: new Date('2022-07-22 21:30').getTime(),
    salesOption: 'string',
  },
};

export default function EventInfo({ eventId }: EventInfoProps) {
  const [data, setData] = useState(EVENT.data);
  return (
    <div className="w-full mb-10 ">
      <div className=" relative w-[calc(100%+32px)] -translate-x-4 h-[140px] bg-gray-100">
        <div className="m-auto translate-y-[90px] max-w-fit">
          <Image src={'/images/temp.jpeg'} width={100} height={100} className="rounded-full" />
        </div>
      </div>
      <div className="flex flex-col justify-between h-[200px]">
        <div className="flex justify-between mt-4">
          <span className="font-bold ">
            <span className="mr-2 text-xs opacity-40">아티스트</span>
            <span className="text-sm">{`디렌디`}</span>
          </span>
          <LinkBox twitterUrl={data.twitterUrl} instagramUrl={data.instagramUrl} webpageUrl={data.webpageUrl} />
        </div>
        <div>
          <h1 className="text-2xl font-bold ">[콘서트] 밤 하늘의 별</h1>
          <Block />
          <EventSaleTimer endTime={data.salesTo} />
          <Block />
          <div className="flex justify-between leading-6">
            <span className="text-sm font-semibold leading-6 opacity-40">
              총 {data.totalTicketCount}개 중 {data.onSaleTicketCount}개 판매 완료
            </span>
            <div className="font-bold leading-6 text-md text-brand">
              <span className="mr-4">판매가</span>
              <span>270,000원</span>
            </div>
          </div>
        </div>
      </div>
      <Block />
      <Image src={data.image} width={388} height={388} />
      <TextInfo
        title="공연정보"
        contents={[
          { header: '장소', info: '예술의 전당' },
          { header: '공연 일시', info: dayjsKO(data.startTime).format('YYYY.MM.DD (ddd) A hh시 mm분') },
          { header: '공연 시간', info: `${(data.endTime - data.startTime) / 1000 / 60}분` },
        ]}
      />
      <div className="p-4">
        <h2 className="text-xl font-bold">공연 설명</h2>
        <div className="flex mt-4">
          <span className="text-sm ">{data.description}</span>
        </div>
      </div>
      <TextInfo
        title="NFT 티켓 정보"
        contents={[
          { header: '혜택', info: '-' },
          { header: '티켓 사용법', info: '-' },
          { header: '안내사항', info: '-' },
        ]}
      />
      <TextInfo
        title="기타 안내"
        contents={[
          { header: '티켓 사용법', info: '-' },
          { header: '안내사항', info: '-' },
        ]}
      />
      <TextInfo
        title="NFT 컬렉션 상세"
        contents={[
          { header: 'Contract Address', info: '-' },
          { header: 'Token Standard', info: '-' },
          { header: 'BlockChain', info: '-' },
        ]}
      />
    </div>
  );
}
