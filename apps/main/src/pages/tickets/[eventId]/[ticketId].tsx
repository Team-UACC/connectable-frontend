import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
// eslint-disable-next-line import/no-named-as-default
import toast from 'react-hot-toast';

import Button from '~/components/Button';
import FormOrderButton from '~/components/Button/OrderButton/FormOrderButton';
import NFTTransferButton from '~/components/Button/OrderButton/NFTTransferButton';
import { PriceText } from '~/components/Events/EventInfo';
import EventSaleTimer from '~/components/Events/EventSaleTimer';
import StickyBlurFooter from '~/components/Footer/StickyBlurFooter';
import Spinner from '~/components/Spinner';
import TextInfo from '~/components/TextInfo';
import useEventByIdQuery from '~/hooks/apis/useEventByIdQuery';
import useTicketByIdsQuery from '~/hooks/apis/useTicketByIdsQuery';
import NotFoundPage from '~/pages/404';
import { useUserStore } from '~/stores/user';
import { dayjsKO } from '~/utils/day';

export const getServerSideProps: GetServerSideProps = async context => {
  const { query } = context;
  const { eventId, ticketId } = query;
  return {
    props: { eventId, ticketId },
  };
};

interface Props {
  eventId: string;
  ticketId: string;
}

export default function TicketDetail({ eventId, ticketId }: Props) {
  const { isLoggedIn, klaytnAddress } = useUserStore();

  const { data: ticketDetail, isLoading: isLoadingTicketDetail } = useTicketByIdsQuery(
    Number(eventId),
    Number(ticketId)
  );

  const { data: eventDetail, isLoading: isLoadingEventDetail } = useEventByIdQuery(Number(eventId));

  if (isLoadingTicketDetail || isLoadingEventDetail) {
    return (
      <div className="mt-40">
        <Spinner />
      </div>
    );
  }

  if (typeof eventId !== 'string' || typeof ticketId !== 'string') return <NotFoundPage />;

  if (!ticketDetail || !eventDetail) return <NotFoundPage />;

  return (
    <>
      <Head>
        <title>{`NFT 티켓 | ${ticketDetail.metadata.name}`}</title>
      </Head>
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
        {/* <TextInfo.Simple title="소유 이력">
          <TempTransaction />
          <TempTransaction />
          <TempTransaction />
        </TextInfo.Simple> */}
        <TextInfo
          title="NFT 상세"
          contents={[
            { term: 'Owned By', description: ticketDetail.ownedBy, hasCopy: true },
            { term: 'Contract Address', description: ticketDetail.contractAddress, hasCopy: true },
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
                  toast.error('로그인 후 이용해주세요.');
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
                  toast.error('로그인 후 이용해주세요.');
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
          <>
            <FormOrderButton amount={ticketDetail.price} ticketId={ticketDetail.id} />
            <NFTTransferButton blockchain="Klaytn" eventId={Number(eventId)} ticketId={Number(ticketId)} />
          </>
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
    <div className="flex flex-col mb-4 ">
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
