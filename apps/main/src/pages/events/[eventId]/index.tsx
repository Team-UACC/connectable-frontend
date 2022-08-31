import { GetStaticPropsContext } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { fetchAllEvents, fetchEventsDetail } from '~/apis/events';
import OrderListButton from '~/components/Button/OrderListButton';
import { ArtistImageBox, ArtistName, PriceText, RemainingTicketStatus } from '~/components/Events/EventInfo';
import EventSaleTimer from '~/components/Events/EventSaleTimer';
import LinkBox from '~/components/Events/LinkBox';
import WelcomeTicketPage from '~/components/Events/WelcomTicketPage';
import StickyBlurFooter from '~/components/Footer/StickyBlurFooter';
import HeadMeta from '~/components/HeadMeta';
import Text from '~/components/Text';
import DotText from '~/components/Text/DotText';
import LinkText from '~/components/Text/LinkText';
import LinkToKlaytnScope from '~/components/Text/LinkToKlaytnScope';
import TextInfo from '~/components/Text/TextInfo';
import { BUSINESS } from '~/constants/company';
import { IMAGE_BLUR_DATA_URL } from '~/constants/contents';
import { data } from '~/constants/seo';
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

  if (eventDetail.name === 'Connectale 웰컴 티켓') {
    return <WelcomeTicketPage eventDetail={eventDetail} />;
  }

  return (
    <>
      <HeadMeta
        title={`컬렉션 | ${eventDetail.name}`}
        image={eventDetail.image}
        description={eventDetail.description}
        url={data.url + `/events/${eventDetail.id}`}
        creator={eventDetail.artistName}
      />

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
        <Image
          src={eventDetail.image}
          width={388}
          height={388}
          objectFit="cover"
          layout="responsive"
          priority
          placeholder="blur"
          blurDataURL={IMAGE_BLUR_DATA_URL}
        />
        <br />
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
        <BenefitInformation />
        <AdditionalGuidance />
        <RefundGuidance />
        <TextInfo
          title="NFT 컬렉션 상세"
          contents={[
            {
              term: 'Contract Address',
              description: (
                <LinkToKlaytnScope type="account" account={eventDetail.contractAddress}>
                  {eventDetail.contractAddress}
                </LinkToKlaytnScope>
              ),
            },
            { term: 'Token Standard', description: 'KIP-17' },
            { term: 'BlockChain', description: 'Klaytn' },
            {
              term: 'OpenSea',
              description: <LinkText href={eventDetail.openseaUrl}>오픈씨에서 확인하기</LinkText>,
            },
          ]}
        />
      </article>
      <StickyBlurFooter className=" w-[calc(100%+32px)] ">
        <OrderListButton eventId={eventDetail.id} />
      </StickyBlurFooter>
    </>
  );
}

const AdditionalGuidance = () => {
  return (
    <div className="w-full px-2 py-4 text-sm">
      <h2 className="text-xl font-bold">공연 안내</h2>
      <ul>
        <DotText>공연 입장 시간에 맞추어 공연장 입구 및 계단에서 개인 정보 확인 후 입장을 도와드릴 예정입니다.</DotText>
        <DotText>예매 폼 제출 순으로 입장합니다.</DotText>
        <DotText>공연장 내 좌석은 모두 자유석입니다.</DotText>
      </ul>
    </div>
  );
};

const RefundGuidance = () => {
  return (
    <div className="w-full px-2 py-4 text-sm">
      <h2 className="text-xl font-bold">환불 안내</h2>
      <br />
      <Text>환불 취소 수수료 규정은 아래와 같습니다.</Text>
      <ul>
        <DotText>공연 10일 전까지 : 100% 환급</DotText>
        <DotText>공연 7일 전까지 : 90% 환급</DotText>
        <DotText>공연 3일 전까지 : 80% 환급</DotText>
        <DotText>공연 1일 전까지 : 70% 환급</DotText>
        <DotText>단, 공연 3일 전까지 예매 당일 취소는 100% 환급</DotText>
      </ul>
      <br />
      <Text>환불 절차는 아래와 같습니다.</Text>
      <ul>
        <DotText>
          환불을 위해서는 {BUSINESS.EMAIL} 로 환불 요청자의 성함, 전화번호를 기재하여 요청해주시기 바랍니다.
        </DotText>
        <DotText>본인 확인 절차 후 환불이 진행됩니다.</DotText>
        <DotText>공연 당일 취소, 변경, 환불은 불가합니다.</DotText>
      </ul>
    </div>
  );
};

const BenefitInformation = () => {
  return (
    <div className="w-full px-2 py-4 text-sm">
      <h2 className="text-xl font-bold">NFT 티켓 정보</h2>
      <ul>
        <DotText>조엘 겨울 콘서트 화이트리스트 제공</DotText>
        <DotText>NFT 티켓 소유자 중 추첨을 통해 공연 후 포토타임 제공</DotText>
      </ul>
    </div>
  );
};
