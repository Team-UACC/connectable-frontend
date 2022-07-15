import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
// eslint-disable-next-line import/no-named-as-default
import toast from 'react-hot-toast';

import Button from '~/components/Button';
import { PriceText } from '~/components/event/EventInfo';
import EventSaleTimer from '~/components/event/EventInfo/EventSaleTimer';
import OrderButton from '~/components/event/OrderButton';
import { StickyBlurFooter } from '~/components/Footer';
import TextInfo, { TextInfoSimple } from '~/components/TextInfo';
import { useUserStore } from '~/stores/user';
import { EventDetailType } from '~/types/eventType';
import { dayjsKO } from '~/utils/day';

const EVENT: EventDetailType = {
  id: 1,
  image: 'https://assets.otherside.xyz/otherdeeds/871079decce602d36188f532fe6623a15d8c6817ecd3bcd9b0c3a2933bb51c3b.jpg',
  name: '밤 하늘의 별',
  artistName: '디렌리',
  date: new Date(2022, 7, 22).getTime(),
  description:
    '별이 빛나는 세상을 걸어가고 있는 호랑이의 모습은 우리 삶의 모습으로 비유합니다. 빛나는 세계를 가슴 속에 품고 보이지 않고 뚜렷하지 않는 세상을 걸어가지만, 세상의 달빛은 내 눈과 가슴속 구슬에도 또렷이 맺혀 있습니다. 두 개의 달이 함께 하는 이곳은 현실의 공간을 넘어 어딘가로, 저마다 마음속에 품고 있는 길을 우린 언제나 걷고 있습니다. 달빛의 끝에서 나를 만나고, 저마다 품고 있는 희망을 발견할 수 있기를 희망합니다.',
  salesFrom: new Date(2022, 7, 11).getTime(),
  salesTo: new Date(2022, 7, 16).getTime(),
  twitterUrl: 'https://twitter.com/elonmusk',
  instagramUrl: 'https://www.instagram.com/eunbining0904/',
  webpageUrl: 'https://nextjs.org/',
  totalTicketCount: 20,
  onSaleTicketCount: 6,
  price: 10000,
  startTime: new Date(2022, 7, 22, 19, 30).getTime(),
  endTime: new Date(2022, 7, 22, 21, 30).getTime(),
  salesOption: 'FLAT_PRICE',
  location: '예술의 전당',
};

const TICKET = {
  price: 10000,
  artistName: '디렌디',
  eventDate: new Date(2022, 11, 18),
  eventName: '밤 하늘의 별',
  onSale: true,
  tokenId: 7,
  tokenURI: '',
  contractAddress: '0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D',
  metadata: {
    name: '밤 하늘의 별 #7',
    description:
      '별이 빛나는 세상을 걸어가고 있는 호랑이의 모습은 우리 삶의 모습으로 비유합니다. 빛나는 세계를 가슴 속에 품고 보이지 않고 뚜렷하지 않는 세상을 걸어가지만, 세상의 달빛은 내 눈과 가슴속 구슬에도 또렷이 맺혀 있습니다. 두 개의 달이 함께 하는 이곳은 현실의 공간을 넘어 어딘가로, 저마다 마음속에 품고 있는 길을 우린 언제나 걷고 있습니다. 달빛의 끝에서 나를 만나고, 저마다 품고 있는 희망을 발견할 수 있기를 희망합니다.',
    image:
      'https://assets.otherside.xyz/otherdeeds/871079decce602d36188f532fe6623a15d8c6817ecd3bcd9b0c3a2933bb51c3b.jpg',
    attributes: [
      { trait_type: 'Category', value: 'Volcanic' },
      { trait_type: 'Sediment', value: 'Biogenic Swamp' },
      { trait_type: 'Sediment Tier', value: '2' },
      { trait_type: 'Environment', value: 'Obsidian' },
      { trait_type: 'Environment Tier', value: '1' },
      { trait_type: 'Western Resource', value: 'Brimstone' },
      { trait_type: 'Western Resource Tier', value: '3' },
      { trait_type: 'Northern Resource', value: 'Abyssia' },
      { trait_type: 'Northern Resource Tier', value: '3' },
      { trait_type: 'Plot', value: '1' },
    ],
  },
  ownedBy: '0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D',
};

export default function TicketDetail() {
  const { isLoggedIn, klaytnAddress } = useUserStore();

  const [ticketDetail] = useState(TICKET);
  const [eventDetail] = useState(EVENT);

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
        <TextInfoSimple title={`공연 설명`}>{eventDetail.description}</TextInfoSimple>
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
        <TextInfoSimple title="소유 이력">
          <TempTransaction />
          <TempTransaction />
          <TempTransaction />
        </TextInfoSimple>
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
        ) : (
          <OrderButton amount={ticketDetail.price} orderName={ticketDetail.metadata.name} />
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
