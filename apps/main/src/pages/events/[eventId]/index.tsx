import { GetStaticPropsContext } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { fetchAllEvents, fetchEventsDetail } from '~/apis/events';
import OrderListButton from '~/components/Button/OrderListButton';
import { ArtistImageBox, ArtistName, PriceText, RemainingTicketStatus } from '~/components/Events/EventInfo';
import EventSaleTimer from '~/components/Events/EventSaleTimer';
import LinkBox from '~/components/Events/LinkBox';
import StickyBlurFooter from '~/components/Footer/StickyBlurFooter';
import TextInfo from '~/components/TextInfo';
import useEventByIdQuery from '~/hooks/apis/useEventByIdQuery';
import NotFoundPage from '~/pages/404';
import { EventDetailType } from '~/types/eventType';
import { dayjsKO } from '~/utils/day';

export async function getStaticPaths() {
  const events = await fetchAllEvents();
  const paths = events.map(e => ({ params: { eventId: e.id.toString() } }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }: GetStaticPropsContext) {
  const initialEventDetail = await fetchEventsDetail(Number(params?.eventId));
  return {
    props: {
      initialEventDetail,
    },
  };
}

interface Props {
  initialEventDetail: EventDetailType;
}

export default function EventDetailPage({ initialEventDetail }: Props) {
  const router = useRouter();
  const { eventId } = router.query;

  const [eventStart, setEventStart] = useState('');

  const { data: eventDetail, refetch: refetchEventDetail } = useEventByIdQuery(Number(eventId), {
    initialData: initialEventDetail,
  });

  if (!eventDetail) return <NotFoundPage />;

  useEffect(() => {
    if (router.isReady) {
      refetchEventDetail();
    }
  }, [router]);

  useEffect(() => {
    setEventStart(dayjsKO(eventDetail.startTime).format('YYYY.MM.DD (ddd) A hh시 mm분'));
  }, []);

  return (
    <>
      <Head>
        <title>{`컬렉션 | ${eventDetail.name}`}</title>
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
            { term: '혜택1', description: '조엘 겨울 콘서트 화이트리스트 제공' },
            { term: '혜택2', description: 'NFT 티켓 소유자 중 추첨을 통해 공연 후 포토타임 제공' },
          ]}
        />
        <TextInfo
          title="기타 안내"
          contents={[
            { term: '티켓 사용법', description: '공연 입장 전, 마이페이지에서 본인의 티켓을 보여주세요.' },
            {
              term: '안내사항1',
              description:
                '공연 입장 시간에 맞추어 공연장 입구 및 게단에서 개인 정보 확인 후 입장을 도와드릴 예정입니다.',
            },
            {
              term: '안내사항2',
              description: '예매 폼 제출 순으로 입장합니다.',
            },
            {
              term: '안내사항3',
              description: '공연장 내 좌석은 모두 자유석입니다.',
            },
            {
              term: '안내사항4',
              description:
                '취소 문의는 010-5248-4170으로 공연명, 성함, 계좌번호를 보내주시면 순차적으로 처리해드리겠습니다.',
            },
          ]}
        />
        <TextInfo
          title="NFT 컬렉션 상세"
          contents={[
            { term: 'Contract Address', description: eventDetail.contractAddress, hasCopy: true },
            { term: 'Token Standard', description: 'KIP-17' },
            { term: 'BlockChain', description: 'Klaytn' },
          ]}
        />
      </article>
      <StickyBlurFooter className=" w-[calc(100%+32px)] ">
        <OrderListButton eventId={eventDetail.id} />
      </StickyBlurFooter>
    </>
  );
}
