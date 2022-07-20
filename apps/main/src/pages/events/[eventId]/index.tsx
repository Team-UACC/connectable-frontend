import { GetStaticPropsContext } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import { fetchAllEvents, fetchEventsDetail } from '~/apis/events';
import FormOrderButton from '~/components/Button/OrderButton/FormOrderButton';
import OrderListButton from '~/components/Button/OrderListButton';
import { ArtistImageBox, ArtistName, PriceText, RemainingTicketStatus } from '~/components/Events/EventInfo';
import EventSaleTimer from '~/components/Events/EventSaleTimer';
import LinkBox from '~/components/Events/LinkBox';
import StickyBlurFooter from '~/components/Footer/StickyBlurFooter';
import TextInfo from '~/components/TextInfo';
import { EventDetailType } from '~/types/eventType';
import { dayjsKO } from '~/utils/day';

import { EVENT_DUMMY } from '../../';

export async function getStaticPaths() {
  // fetch id list
  const events = [...EVENT_DUMMY, ...(await fetchAllEvents())];
  const paths = events.map(e => ({ params: { eventId: e.id.toString() } }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }: GetStaticPropsContext) {
  const eventDetail = await fetchEventsDetail(Number(params?.eventId));
  return {
    props: {
      eventDetail,
    },
  };
}

interface Props {
  eventDetail: EventDetailType;
}

export default function EventDetailPage({ eventDetail }: Props) {
  const [eventStart, setEventStart] = useState('');
  useEffect(() => {
    setEventStart(dayjsKO(eventDetail.startTime).format('YYYY.MM.DD (ddd) A hh시 mm분'));
  }, []);

  return (
    <>
      <Head>
        <title>컬렉션 | {eventDetail.name}</title>
      </Head>
      <article className="relative w-full mb-10 ">
        <ArtistImageBox src={eventDetail.artistImage} />
        <section className="flex flex-col justify-between h-40 my-6">
          <div className="flex justify-between mb-4">
            <ArtistName artistName={eventDetail.artistName} />
            <LinkBox
              twitterUrl={eventDetail.twitterUrl}
              instagramUrl={eventDetail.instagramUrl}
              webpageUrl={eventDetail.webpageUrl}
            />
          </div>
          <h1 className="text-2xl font-bold ">{eventDetail.name}</h1>
          <EventSaleTimer endTime={eventDetail.salesTo} />
          <div className="flex justify-between leading-6">
            <RemainingTicketStatus
              totalTicketCount={eventDetail.totalTicketCount}
              onSaleTicketCount={eventDetail.onSaleTicketCount}
            />
            {eventDetail.salesOption === 'FLAT_PRICE' && (
              <PriceText>{`${eventDetail.price.toLocaleString('ko-KR')}원`}</PriceText>
            )}
          </div>
        </section>
        <Image src={eventDetail.image} width={388} height={388} objectFit="cover" layout="responsive" />
        <TextInfo
          title="공연정보"
          contents={[
            { term: '장소', description: eventDetail.location },
            { term: '공연 일시', description: eventStart },
            {
              term: '공연 시간',
              description: `${Math.floor((eventDetail.endTime - eventDetail.startTime) / 1000 / 60)}분`,
            },
          ]}
        />
        <TextInfo.Simple title={`공연 설명`}>{eventDetail.description}</TextInfo.Simple>
        <TextInfo
          title="NFT 티켓 정보"
          contents={[
            { term: '혜택', description: '-' },
            { term: '티켓 사용법', description: '-' },
            { term: '안내사항', description: '-' },
          ]}
        />
        <TextInfo
          title="기타 안내"
          contents={[
            { term: '티켓 사용법', description: '-' },
            { term: '안내사항', description: '-' },
          ]}
        />
        <TextInfo
          title="NFT 컬렉션 상세"
          contents={[
            { term: 'Contract Address', description: '-' },
            { term: 'Token Standard', description: '-' },
            { term: 'BlockChain', description: '-' },
          ]}
        />
      </article>
      <StickyBlurFooter>
        {eventDetail.salesOption === 'FLAT_PRICE' ? (
          <FormOrderButton amount={eventDetail.price} numberLimit={4} />
        ) : (
          <OrderListButton eventId={eventDetail.id} />
        )}
      </StickyBlurFooter>
    </>
  );
}
