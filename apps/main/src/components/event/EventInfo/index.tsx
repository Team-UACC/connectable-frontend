import Image from 'next/image';
import { useEffect, useState } from 'react';

import { Block } from '~/components/Block';
import EventSaleTimer from '~/components/event/EventSaleTimer';
import { EventDetailType } from '~/types/eventType';
import { dayjsKO } from '~/utils/day';

import LinkBox from './LinkBox';
import TextInfo from './TextInfo';

interface Props {
  eventDetail: EventDetailType;
}

export default function EventInfo({ eventDetail }: Props) {
  const [data, setData] = useState(eventDetail);

  const [eventStart, setEventStart] = useState('');
  useEffect(() => {
    setEventStart(dayjsKO(data.startTime).format('YYYY.MM.DD (ddd) A hh시 mm분'));
  }, []);
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
          { header: '공연 일시', info: eventStart },
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
