import { Axios } from 'axios';

import { EventDetailType, EventSimpleType } from '~/types/eventType';
import { TicketType } from '~/types/ticketType';

const eventAxios = new Axios({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/events`,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
  },
  timeout: 3000,
});

export type GetEventRes = Array<EventSimpleType>;

export const getAllEvents = async (): Promise<GetEventRes> => {
  const response = await eventAxios.get(``);

  return JSON.parse(response.data);
};

export const getEventsAllTickets = async (eventId: string): Promise<Array<TicketType>> => {
  const response = await eventAxios.get(`/${eventId}/tickets`);

  if (eventId !== '1') return new Array(10).fill(TICKET); // 더미데이터

  return JSON.parse(response.data);
};

export const getEventsDetail = async (eventId: string): Promise<EventDetailType> => {
  const response = await eventAxios.get(`/${eventId}`);

  if (eventId !== '1') return EVENT;

  return JSON.parse(response.data);
};

export const getTicketsDetail = async (eventId: string, tokenId: string): Promise<TicketType> => {
  const response = await eventAxios.get(`/${eventId}/tickets/${tokenId}`);

  if (eventId !== '1') return TICKET; // 더미데이터

  return {
    ...JSON.parse(response.data),
    metadata: {
      name: '밤 하늘의 별 #7',
      description:
        '별이 빛나는 세상을 걸어가고 있는 호랑이의 모습은 우리 삶의 모습으로 비유합니다. 빛나는 세계를 가슴 속에 품고 보이지 않고 뚜렷하지 않는 세상을 걸어가지만, 세상의 달빛은 내 눈과 가슴속 구슬에도 또렷이 맺혀 있습니다. 두 개의 달이 함께 하는 이곳은 현실의 공간을 넘어 어딘가로, 저마다 마음속에 품고 있는 길을 우린 언제나 걷고 있습니다. 달빛의 끝에서 나를 만나고, 저마다 품고 있는 희망을 발견할 수 있기를 희망합니다.',
      image:
        'https://assets.otherside.xyz/otherdeeds/871079decce602d36188f532fe6623a15d8c6817ecd3bcd9b0c3a2933bb51c3b.jpg',
    },
    ownedBy: '0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D',
  };
};

const TICKET: TicketType = {
  price: 10000,
  artistName: '디렌디',
  eventDate: new Date(2022, 11, 18).getTime(),
  eventName: '밤 하늘의 별',
  onSale: true,
  tokenId: 7,
  tokenURI: '',
  eventId: 2,
  contractAddress: '0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D',
  metadata: {
    name: '밤 하늘의 별 #7',
    description:
      '별이 빛나는 세상을 걸어가고 있는 호랑이의 모습은 우리 삶의 모습으로 비유합니다. 빛나는 세계를 가슴 속에 품고 보이지 않고 뚜렷하지 않는 세상을 걸어가지만, 세상의 달빛은 내 눈과 가슴속 구슬에도 또렷이 맺혀 있습니다. 두 개의 달이 함께 하는 이곳은 현실의 공간을 넘어 어딘가로, 저마다 마음속에 품고 있는 길을 우린 언제나 걷고 있습니다. 달빛의 끝에서 나를 만나고, 저마다 품고 있는 희망을 발견할 수 있기를 희망합니다.',
    image:
      'https://assets.otherside.xyz/otherdeeds/871079decce602d36188f532fe6623a15d8c6817ecd3bcd9b0c3a2933bb51c3b.jpg',
  },
  ownedBy: '0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D',
};

const EVENT: EventDetailType = {
  id: 1,
  image: 'https://assets.otherside.xyz/otherdeeds/871079decce602d36188f532fe6623a15d8c6817ecd3bcd9b0c3a2933bb51c3b.jpg',
  name: '밤 하늘의 별',
  artistName: '디렌리',
  date: new Date(2022, 6, 22).getTime(),
  description:
    '별이 빛나는 세상을 걸어가고 있는 호랑이의 모습은 우리 삶의 모습으로 비유합니다. 빛나는 세계를 가슴 속에 품고 보이지 않고 뚜렷하지 않는 세상을 걸어가지만, 세상의 달빛은 내 눈과 가슴속 구슬에도 또렷이 맺혀 있습니다. 두 개의 달이 함께 하는 이곳은 현실의 공간을 넘어 어딘가로, 저마다 마음속에 품고 있는 길을 우린 언제나 걷고 있습니다. 달빛의 끝에서 나를 만나고, 저마다 품고 있는 희망을 발견할 수 있기를 희망합니다.',
  salesFrom: new Date(2022, 6, 11).getTime(),
  salesTo: new Date(2022, 6, 17).getTime(),
  twitterUrl: 'https://twitter.com/elonmusk',
  instagramUrl: 'https://www.instagram.com/eunbining0904/',
  webpageUrl: 'https://nextjs.org/',
  totalTicketCount: 20,
  onSaleTicketCount: 6,
  price: 10000,
  startTime: new Date(2022, 6, 22, 19, 30).getTime(),
  endTime: new Date(2022, 6, 22, 21, 30).getTime(),
  salesOption: 'FLAT_PRICE',
  location: '예술의 전당',
};
