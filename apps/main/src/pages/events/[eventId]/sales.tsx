import { GetStaticPropsContext } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ReactElement, useEffect, useState } from 'react';
// eslint-disable-next-line import/no-named-as-default
import toast from 'react-hot-toast';

import { fetchAllEvents, fetchEventsDetail } from '~/apis/events';
import Button from '~/components/Button';
import TicketCard from '~/components/Card/TicketCard';
import StickyBlurFooter from '~/components/Footer/StickyBlurFooter';
import OrderForm from '~/components/Form/OrderForm';
import TicketDetailForm from '~/components/Form/TicketDetailForm';
import HeadMeta from '~/components/HeadMeta';
import Text from '~/components/Text';
import LoginRequestToast from '~/components/Toast/LoginRequestToast';
import { data } from '~/constants/seo';
import useTicketsByEventIdQuery from '~/hooks/apis/useTicketsByEventIdQuery';
import { useModalStore } from '~/stores/modal';
import { useUserStore } from '~/stores/user';
import { EventDetailType } from '~/types/eventType';
import { isShallowModalUrl, toggleSet } from '~/utils/index';

export async function getStaticPaths() {
  const events = await fetchAllEvents();
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

export default function EventsSalesPage({ eventDetail }: Props) {
  const router = useRouter();
  const { eventId } = router.query;

  const { isLoggedIn } = useUserStore();
  const { showModal, hideModal } = useModalStore();

  const [checkedSet, setCheckedSet] = useState(new Set<number>());

  const {
    data: ticketList,
    isFetched,
    refetch,
  } = useTicketsByEventIdQuery(Number(eventId), {
    staleTime: 0,
    onSuccess: () => setCheckedSet(new Set<number>()),
    enabled: router.isReady,
  });

  useEffect(() => {
    if (router.isReady) {
      const storage = globalThis?.sessionStorage;
      const previousLink = storage.getItem('prevPath') || '/';

      if (previousLink !== `/events/${eventDetail.id}/sales` && !isShallowModalUrl(previousLink)) {
        refetch();
      }
    }
  }, [router]);

  useEffect(() => {
    if (isShallowModalUrl(router.asPath)) {
      showModal(
        <ShallowModalBackButton />,
        <TicketDetailForm eventId={Number(eventId)} ticketId={Number(router.query.ticketId)} />
      );
    } else {
      hideModal();
    }
  }, [router.asPath]);

  return (
    <>
      <HeadMeta
        title={`티켓 판매 목록 | ${eventDetail.name}`}
        image={eventDetail.image}
        description={eventDetail.description}
        url={data.url + `/events/${eventDetail.id}/sales`}
        creator={eventDetail.artistName}
      />

      {!isFetched && <Text>loading...</Text>}

      {isFetched && (
        <section className="relative ">
          <ul className="w-full ">
            {ticketList?.map(ticketData => (
              <div
                key={ticketData.tokenId}
                className={
                  `relative px-2 flex w-full bg-transparent cursor-pointer shadow-lg hover:rounded-lg [@media(hover:hover)]:hover:bg-[#EBF8FF] transition-all ease-in-out ` +
                  (checkedSet.has(ticketData.id) ? `bg-[#EBF8FF] ` : '') +
                  (ticketData.ticketSalesStatus !== 'ON_SALE'
                    ? ` opacity-50 [@media(hover:hover)]:hover:bg-transparent `
                    : '')
                }
              >
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    className="text-indigo-600 form-checkbox"
                    checked={checkedSet.has(ticketData.id)}
                    disabled={ticketData.ticketSalesStatus !== 'ON_SALE'}
                    onChange={() => setCheckedSet(toggleSet(ticketData.id))}
                  />
                </label>
                <div
                  onClick={() => ticketData.ticketSalesStatus === 'ON_SALE' && setCheckedSet(toggleSet(ticketData.id))}
                >
                  <TicketCard
                    key={ticketData.tokenId}
                    ticketData={ticketData}
                    eventId={Number(eventId)}
                    type="Order"
                    className="mb-1 min-w-[min(360px,80vw)] "
                  />
                </div>
              </div>
            ))}
          </ul>
          <StickyBlurFooter className="w-full">
            <Button
              className="sticky bottom-0 -translate-x-1/2 left-1/2 "
              disabled={checkedSet.size === 0}
              onClick={() => {
                if (isLoggedIn) {
                  showModal(
                    '티켓 구매하기',
                    <OrderForm
                      amount={ticketList!.reduce((total, v) => (checkedSet.has(v.id) ? total + v.price : total), 0)}
                      ticketIdList={[...checkedSet]}
                      eventId={Number(eventId)}
                    />
                  );
                } else {
                  toast.error(<LoginRequestToast />);
                }
              }}
            >
              {`티켓 ${checkedSet.size}장 ` + '구매하기'}
            </Button>
          </StickyBlurFooter>
        </section>
      )}
    </>
  );
}

EventsSalesPage.getLayout = function getLayout(page: ReactElement) {
  const router = useRouter();

  return (
    <div className="relative m-auto " style={{ width: 'min(428px, 100vw)', minHeight: '100vh' }}>
      <header className="sticky top-0 z-10 flex justify-between w-full px-5 bg-[rgba(255,255,255,0.5)] backdrop-blur-md">
        <nav className="relative flex justify-between w-full py-6 ">
          <div className="flex flex-col justify-center">
            <Link className="translate-x-1 " href={`/events/${router.query.eventId}`}>
              <a>
                <span className="p-2 text-2xl font-semibold cursor-pointer ">{'<'}</span>
              </a>
            </Link>
          </div>
          <span className="absolute px-2 text-lg font-semibold -translate-x-1/2 left-1/2 ">티켓 목록</span>
        </nav>
      </header>
      <div className="flex flex-col items-center px-4 ">{page}</div>
    </div>
  );
};

const ShallowModalBackButton = () => {
  const { hideModal } = useModalStore();

  return (
    <button
      className="text-2xl cursor-pointer"
      type="button"
      onClick={() => {
        const storage = globalThis?.sessionStorage;
        const current = storage.getItem('currentPath') || '/';

        if (isShallowModalUrl(current)) {
          window.history.back();
          window.history.replaceState(window.history.state, '', window.location.pathname);
        }

        hideModal();
      }}
    >
      {'<'}
    </button>
  );
};
