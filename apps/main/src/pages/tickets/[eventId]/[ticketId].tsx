import { GetServerSidePropsContext } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
// eslint-disable-next-line import/no-named-as-default
import toast from 'react-hot-toast';

import { fetchAllEvents, fetchEventsAllTickets, fetchEventsDetail, fetchTicketsDetail } from '~/apis/events';
import Button from '~/components/Button';
import FormOrderButton from '~/components/Button/OrderButton/FormOrderButton';
import NFTTransferButton from '~/components/Button/OrderButton/NFTTransferButton';
import { PriceText } from '~/components/Events/EventInfo';
import EventSaleTimer from '~/components/Events/EventSaleTimer';
import StickyBlurFooter from '~/components/Footer/StickyBlurFooter';
import HeadMeta from '~/components/HeadMeta';
import LinkToKlaytnScope from '~/components/LinkToKlaytnScope';
import TextInfo from '~/components/TextInfo';
import LoginRequestToast from '~/components/Toast/LoginRequestToast';
import { data } from '~/constants/seo';
import useEventByIdQuery from '~/hooks/apis/useEventByIdQuery';
import useTicketByIdsQuery from '~/hooks/apis/useTicketByIdsQuery';
import NotFoundPage from '~/pages/404';
import { useUserStore } from '~/stores/user';
import { EventDetailType } from '~/types/eventType';
import { Ticket } from '~/types/ticketType';
import { dayjsKO } from '~/utils/day';

export async function getStaticPaths() {
  const events = await fetchAllEvents();
  const paths = await Promise.all(
    events.map(async e => {
      const eventId = e.id.toString();
      const tickets = await fetchEventsAllTickets(Number(eventId));

      const paramsList = tickets.map(t => ({ params: { eventId, ticketId: t.id.toString() } }));

      return paramsList;
    })
  );
  return { paths: paths.flat(), fallback: false };
}

export async function getStaticProps(context: GetServerSidePropsContext<{ eventId: string; ticketId: string }>) {
  if (!context.params) return;

  const { eventId, ticketId } = context.params;

  const [eventDetail, ticketDetail] = await Promise.all([
    fetchEventsDetail(Number(eventId)),
    fetchTicketsDetail(Number(eventId), Number(ticketId)),
  ]);

  return {
    props: {
      skeletonDataEvent: eventDetail,
      skeletonDataTicket: { ...ticketDetail, ticketSalesStatus: '' },
    },
  };
}

interface Props {
  skeletonDataTicket: Ticket;
  skeletonDataEvent: EventDetailType;
}

export default function TicketDetail({ skeletonDataTicket, skeletonDataEvent }: Props) {
  const router = useRouter();
  const { eventId, ticketId } = router.query;

  const { isLoggedIn, klaytnAddress } = useUserStore();

  const { data: ticketDetail, refetch: refetchTicketDetail } = useTicketByIdsQuery(Number(eventId), Number(ticketId), {
    initialData: skeletonDataTicket,
  });

  const { data: eventDetail, refetch: refetchEventDetail } = useEventByIdQuery(Number(eventId), {
    initialData: skeletonDataEvent,
  });

  useEffect(() => {
    if (router.isReady) {
      refetchEventDetail();
      refetchTicketDetail();
    }
  }, [router]);

  if (!ticketDetail || !eventDetail) return <NotFoundPage />;

  return (
    <>
      <HeadMeta
        title={`NFT 티켓 | ${ticketDetail.metadata.name}`}
        image={ticketDetail.metadata.image}
        description={ticketDetail.metadata.description}
        url={data.url + `/tickets/${ticketDetail.eventId}/${ticketDetail.id}`}
        creator={ticketDetail.artistName}
      />

      <div className="w-full ">
        <div className=" relative w-[calc(100%+2rem)] p-4 -translate-x-4 bg-gray-100 ">
          <div className="m-2 max-w-fit drop-shadow-2xl">
            <Image
              src={ticketDetail.metadata.image}
              width={388}
              height={388}
              objectFit="cover"
              className="rounded-[10px] "
            />
          </div>
        </div>
        <h1 className="px-2 py-4 mt-2 text-lg font-bold">{ticketDetail.metadata.name}</h1>
        {ticketDetail.ticketSalesStatus === 'ON_SALE' && (
          <div className="px-2">
            <div className="mb-2 text-sm font-bold text-red">아직 판매되지 않은 티켓입니다.</div>
            <EventSaleTimer endTime={eventDetail.salesTo} />
            <div className="flex justify-between mt-2">
              <div />
              <PriceText>{`${eventDetail.price.toLocaleString('ko-KR')}원`}</PriceText>
            </div>
          </div>
        )}
        {ticketDetail.ticketSalesStatus === 'PENDING' && (
          <div className="px-2">
            <div className="mb-2 text-sm font-bold text-red">누군가 구매 승인을 대기하고 있는 티켓입니다.</div>
            <EventSaleTimer endTime={eventDetail.salesTo} />
            <div className="flex justify-between mt-2">
              <div />
              <PriceText>{`${eventDetail.price.toLocaleString('ko-KR')}원`}</PriceText>
            </div>
          </div>
        )}
        <TextInfo
          title="공연정보"
          contents={[
            { term: '장소', description: eventDetail.location },
            { term: '공연 일시', description: dayjsKO(eventDetail.startTime).format('YYYY.MM.DD (ddd) A hh시 mm분') },
            { term: '공연 시간', description: `${(eventDetail.endTime - eventDetail.startTime) / 1000 / 60}분` },
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
                '공연 입장 시간에 맞추어 공연장 입구 및 계단에서 개인 정보 확인 후 입장을 도와드릴 예정입니다.',
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
        {/* <TextInfo.Simple title="소유 이력">
          <TempTransaction />
          <TempTransaction />
          <TempTransaction />
        </TextInfo.Simple> */}
        <TextInfo
          title="NFT 상세"
          contents={[
            { term: 'Owned By', description: ticketDetail.ownedBy, hasCopy: true },
            {
              term: 'Contract Address',
              description: (
                <LinkToKlaytnScope type="account" account={eventDetail.contractAddress}>
                  {eventDetail.contractAddress}
                </LinkToKlaytnScope>
              ),
            },
            { term: 'Token ID', description: ticketDetail.tokenId.toString() },
            { term: 'Token Standard', description: 'KIP-17' },
            { term: 'BlockChain', description: 'Klaytn' },
          ]}
        />
      </div>
      <StickyBlurFooter className=" w-[calc(100%+32px)] ">
        {klaytnAddress === ticketDetail.ownedBy ? (
          <>
            <Button
              onClick={() => {
                if (!isLoggedIn) {
                  toast.error(<LoginRequestToast />, { icon: null });
                } else {
                  toast.success('준비중입니다.');
                }
              }}
            >
              공유하기
            </Button>
            <NFTTransferButton blockchain="Klaytn" eventId={Number(eventId)} ticketId={Number(ticketId)} />
            <Button
              onClick={() => {
                if (!isLoggedIn) {
                  toast.error(<LoginRequestToast />, { icon: null });
                } else {
                  toast.success('준비중입니다.');
                }
              }}
              color="red"
            >
              QR 입장
            </Button>
          </>
        ) : ticketDetail.ticketSalesStatus === 'ON_SALE' ? (
          <FormOrderButton amount={ticketDetail.price} ticketId={ticketDetail.id} />
        ) : (
          <Button
            onClick={() => {
              if (!isLoggedIn) {
                toast.error(<LoginRequestToast />, { icon: null });
              } else toast.success('준비중입니다.');
            }}
          >
            공유하기
          </Button>
        )}
      </StickyBlurFooter>
    </>
  );
}
