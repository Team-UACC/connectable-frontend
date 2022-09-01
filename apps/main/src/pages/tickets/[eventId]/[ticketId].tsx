import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
// eslint-disable-next-line import/no-named-as-default
import toast from 'react-hot-toast';

import { fetchAllEvents, fetchEventsAllTickets, fetchEventsDetail, fetchTicketsDetail } from '~/apis/events';
import Button from '~/components/Button';
import FormOrderButton from '~/components/Button/OrderButton/FormOrderButton';
import NFTTransferButton from '~/components/Button/OrderButton/NFTTransferButton';
import QREntranceButton from '~/components/Button/QREntranceButton';
import StickyBlurFooter from '~/components/Footer/StickyBlurFooter';
import HeadMeta from '~/components/HeadMeta';
import TicketDetailArticle from '~/components/Tickets/TicketDetailArticle';
import LoginRequestToast from '~/components/Toast/LoginRequestToast';
import { data } from '~/constants/seo';
import useEventByIdQuery from '~/hooks/apis/useEventByIdQuery';
import useTicketByIdsQuery from '~/hooks/apis/useTicketByIdsQuery';
import NotFoundPage from '~/pages/404';
import { useUserStore } from '~/stores/user';
import { EventDetailType } from '~/types/eventType';
import { Ticket } from '~/types/ticketType';

export async function getStaticPaths() {
  const events = await fetchAllEvents();
  const paths = await Promise.all(
    events.map(async e => {
      const eventId = e.id.toString();
      let tickets = await fetchEventsAllTickets(Number(eventId));

      // 토큰 소각에 대한 예외처리
      if (eventId === '1') {
        tickets = tickets.filter(t => t.id !== 2);
      }

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

export default function TicketDetailPage({ skeletonDataTicket, skeletonDataEvent }: Props) {
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

      <TicketDetailArticle ticketDetail={ticketDetail} eventDetail={eventDetail} />

      <StickyBlurFooter className=" w-[calc(100%+32px)] ">
        {klaytnAddress === ticketDetail.ownedBy ? (
          <>
            <Button
              onClick={() => {
                if (!isLoggedIn) {
                  toast.error(<LoginRequestToast />);
                } else {
                  toast.success('준비중입니다.');
                }
              }}
            >
              공유하기
            </Button>
            <NFTTransferButton blockchain="Klaytn" eventId={Number(eventId)} ticketId={Number(ticketId)} />
            {!ticketDetail.isUsed && <QREntranceButton ticketId={ticketDetail.id} />}
          </>
        ) : ticketDetail.ticketSalesStatus === 'ON_SALE' ? (
          <FormOrderButton amount={ticketDetail.price} ticketId={ticketDetail.id} eventId={Number(eventId)} />
        ) : (
          <Button
            onClick={() => {
              if (!isLoggedIn) {
                toast.error(<LoginRequestToast />);
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
