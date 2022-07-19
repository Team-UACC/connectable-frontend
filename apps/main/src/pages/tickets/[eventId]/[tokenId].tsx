import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
// eslint-disable-next-line import/no-named-as-default
import toast from 'react-hot-toast';
import { useQuery } from 'react-query';

import { fetchEventsDetail, fetchTicketsDetail } from '~/apis/events';
import Button from '~/components/Button';
import { PriceText } from '~/components/event/EventInfo';
import EventSaleTimer from '~/components/event/EventInfo/EventSaleTimer';
import FormOrderButton from '~/components/event/OrderButton/FormOrderButton';
import { StickyBlurFooter } from '~/components/Footer';
import Spinner from '~/components/Spinner';
import TextInfo from '~/components/TextInfo';
import NotFoundPage from '~/pages/404';
import { useUserStore } from '~/stores/user';
import { dayjsKO } from '~/utils/day';

export default function TicketDetail() {
  const router = useRouter();

  const { eventId, tokenId } = router.query;
  const { isLoggedIn, klaytnAddress } = useUserStore();

  const { data: ticketDetail, isLoading: isLoadingTicketDetail } = useQuery(['ticketDetail', eventId, tokenId], () =>
    fetchTicketsDetail(eventId as string, tokenId as string)
  );

  const { data: eventDetail, isLoading: isLoadingEventDetail } = useQuery(['event', eventId], () =>
    fetchEventsDetail(eventId as string)
  );

  if (isLoadingTicketDetail || isLoadingEventDetail)
    return (
      <div className="mt-40">
        <Spinner />
      </div>
    );

  if (typeof eventId !== 'string' || typeof tokenId !== 'string') return <NotFoundPage />;

  if (!ticketDetail || !eventDetail) return <NotFoundPage />;

  return (
    <>
      <Head>
        <title> NFT 티켓 | {ticketDetail.metadata.name}</title>
      </Head>
      <div className="w-full ">
        <div className=" relative w-[calc(100%+2rem)] p-4 -translate-x-4 bg-gray-100 ">
          <div className="m-2 max-w-fit drop-shadow-2xl">
            <Image src={ticketDetail.metadata.image} width={388} height={388} className="rounded-[10px] " />
          </div>
        </div>
        <h1 className="p-4 mt-2 text-lg font-bold">{ticketDetail.metadata.name}</h1>
        {ticketDetail.onSale && (
          <div className="px-4">
            <div className="mb-2 text-sm font-bold text-red">아직 판매되지 않은 티켓입니다.</div>
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
        <TextInfo.Simple title="소유 이력">
          <TempTransaction />
          <TempTransaction />
          <TempTransaction />
        </TextInfo.Simple>
        <TextInfo
          title="NFT 상세"
          contents={[
            { term: 'Owned By', description: ticketDetail.ownedBy, hasCopy: true },
            { term: 'Contract Address', description: '0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D', hasCopy: true },
            { term: 'Token ID', description: '7' },
            { term: 'Token Standard', description: 'KIP-17' },
            { term: 'BlockChain', description: 'Klaytn' },
          ]}
        />
      </div>
      <StickyBlurFooter>
        {klaytnAddress === ticketDetail.ownedBy ? (
          <>
            <Button
              onClick={() => {
                if (!isLoggedIn) {
                  toast.error('로그인 후 이용해주세요.');
                } else toast.success('준비중입니다.');
              }}
            >
              공유하기
            </Button>
            <Button
              onClick={() => {
                if (!isLoggedIn) {
                  toast.error('로그인 후 이용해주세요.');
                } else toast.success('준비중입니다.');
              }}
            >
              NFT 전송하기
            </Button>
            <Button
              onClick={() => {
                if (!isLoggedIn) {
                  toast.error('로그인 후 이용해주세요.');
                } else toast.success('준비중입니다.');
              }}
              color="red"
            >
              QR 입장
            </Button>
          </>
        ) : ticketDetail.onSale ? (
          <FormOrderButton amount={ticketDetail.price} orderName={ticketDetail.metadata.name} numberLimit={1} />
        ) : (
          <Button
            onClick={() => {
              if (!isLoggedIn) {
                toast.error('로그인 후 이용해주세요.');
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

const TempTransaction = () => {
  return (
    <div className="flex flex-col mt-4">
      <div className="flex justify-between w-full leading6">
        <span className=" text-[#0987A0] font-bold text-lg">Sale</span>
        <span className="text-sm">3일 전</span>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center w-[35%] justify-between ">
          <Image src="/images/temp.jpeg" width={48} height={48} className="rounded-full " />
          <span className="text-base">디렌디</span>
        </div>
        <div> {'->'} </div>
        <div className="flex items-center w-[35%] justify-between ">
          <Image src="/images/defaultProfile.jpeg" width={48} height={48} className="rounded-full " />
          <span className="text-base">@UACC</span>
        </div>
      </div>
    </div>
  );
};
