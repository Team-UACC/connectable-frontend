import { loadTossPayments, TossPaymentsInstance } from '@tosspayments/payment-sdk';
import { GetStaticPropsContext } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
// eslint-disable-next-line import/no-named-as-default
import toast from 'react-hot-toast';

import { getEvents } from '~/apis/events';
import { Block } from '~/components/Block';
import Button from '~/components/Button';
import { ArtistImageBox, ArtistName, PriceText, RemainingTicketStatus } from '~/components/event/EventInfo';
import EventSaleTimer from '~/components/event/EventInfo/EventSaleTimer';
import LinkBox from '~/components/event/EventInfo/LinkBox';
import { StickyBlurFooter } from '~/components/Footer';
import TextInfo, { TextInfoSimple } from '~/components/TextInfo';
import { useUserStore } from '~/stores/user';
import { EventDetailType } from '~/types/eventType';
import { dayjsKO } from '~/utils/day';

import { EVENT_DUMMY } from '../../';

const EVENT: EventDetailType = {
  id: 1,
  image: 'https://assets.otherside.xyz/otherdeeds/871079decce602d36188f532fe6623a15d8c6817ecd3bcd9b0c3a2933bb51c3b.jpg',
  name: '밤 하늘의 별',
  artistName: '디렌리',
  date: new Date(2022, 6, 22).getTime() / 1000 - 9 * 60 * 60,
  description:
    '별이 빛나는 세상을 걸어가고 있는 호랑이의 모습은 우리 삶의 모습으로 비유합니다. 빛나는 세계를 가슴 속에 품고 보이지 않고 뚜렷하지 않는 세상을 걸어가지만, 세상의 달빛은 내 눈과 가슴속 구슬에도 또렷이 맺혀 있습니다. 두 개의 달이 함께 하는 이곳은 현실의 공간을 넘어 어딘가로, 저마다 마음속에 품고 있는 길을 우린 언제나 걷고 있습니다. 달빛의 끝에서 나를 만나고, 저마다 품고 있는 희망을 발견할 수 있기를 희망합니다.',
  salesFrom: new Date(2022, 6, 11).getTime() / 1000 - 9 * 60 * 60,
  salesTo: new Date(2022, 6, 17).getTime() / 1000 - 9 * 60 * 60,
  twitterUrl: 'https://twitter.com/elonmusk',
  instagramUrl: 'https://www.instagram.com/eunbining0904/',
  webpageUrl: 'https://nextjs.org/',
  totalTicketCount: 20,
  onSaleTicketCount: 6,
  price: 10000,
  startTime: new Date(2022, 6, 22, 19, 30).getTime() / 1000 - 9 * 60 * 60,
  endTime: new Date(2022, 6, 22, 21, 30).getTime() / 1000 - 9 * 60 * 60,
  salesOption: 'FLAT_PRICE',
  location: '예술의 전당',
};

export async function getStaticPaths() {
  // fetch id list
  const events = [...EVENT_DUMMY, ...(await getEvents())];
  const paths = events.map(e => ({ params: { eventId: e.id.toString() } }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }: GetStaticPropsContext) {
  const eventDetail = EVENT;
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
  const { isLoggedIn } = useUserStore();
  const [tossPayments, setTossPayment] = useState<TossPaymentsInstance>();

  const router = useRouter();
  const { eventId } = router.query;

  const [eventStart, setEventStart] = useState('');
  useEffect(() => {
    setEventStart(dayjsKO(eventDetail.startTime * 1000).format('YYYY.MM.DD (ddd) A hh시 mm분'));
  }, []);

  useEffect(() => {
    (async () => {
      const testClientKey = process.env.NEXT_PUBLIC_TOSS_TEST_CLIENT_KEY;
      if (!testClientKey) return;
      const _tossPayments = await loadTossPayments(testClientKey);
      setTossPayment(_tossPayments);
    })();
  }, []);

  const onTransfer = (tossPayments: TossPaymentsInstance) => {
    tossPayments.requestPayment('계좌이체', {
      // 결제 수단 파라미터
      // 결제 정보 파라미터
      amount: eventDetail.price,
      orderId: 'QhVBczmUBer1Oq6fjjxld',
      orderName: eventDetail.name,
      successUrl: `${process.env.NEXT_PUBLIC_ORDER_REDIRECT_URL}/events/${eventId}/order/success`,
      failUrl: `${process.env.NEXT_PUBLIC_ORDER_REDIRECT_URL}/events/${eventId}/order/fail`,
    });
  };

  return (
    <>
      <Head>
        <title>컬렉션 | {eventDetail.name}</title>
      </Head>
      <article className="relative w-full mb-10 ">
        {/* 아트스트 이미지 data 필요 */}
        <ArtistImageBox src={'/images/temp.jpeg'} />
        <section className="flex flex-col justify-between h-40 mt-4">
          <div className="flex justify-between mb-4">
            <ArtistName artistName={eventDetail.artistName} />
            <LinkBox
              twitterUrl={eventDetail.twitterUrl}
              instagramUrl={eventDetail.instagramUrl}
              webpageUrl={eventDetail.webpageUrl}
            />
          </div>
          <h1 className="text-2xl font-bold ">{eventDetail.name}</h1>
          <EventSaleTimer endTime={eventDetail.salesTo * 1000} />
          <div className="flex justify-between leading-6">
            <RemainingTicketStatus
              totalTicketCount={eventDetail.totalTicketCount}
              onSaleTicketCount={eventDetail.onSaleTicketCount}
            />
            <PriceText>270,000원</PriceText>
          </div>
        </section>
        <Block />
        <Image src={eventDetail.image} width={388} height={388} />
        <TextInfo
          title="공연정보"
          contents={[
            { header: '장소', info: '예술의 전당' },
            { header: '공연 일시', info: eventStart },
            { header: '공연 시간', info: `${Math.floor((eventDetail.endTime - eventDetail.startTime) / 60)}분` },
          ]}
        />
        <TextInfoSimple title={`공연 설명`}>{eventDetail.description}</TextInfoSimple>
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
      </article>
      <StickyBlurFooter>
        <Button
          onClick={() => {
            if (isLoggedIn) {
              if (!tossPayments) return toast.error('오류가 발생했습니다. 다시 시도해 주세요.');
              onTransfer(tossPayments);
            } else toast.error('로그인 후 이용해주세요.');
          }}
        >
          구매하기
        </Button>
      </StickyBlurFooter>
    </>
  );
}
