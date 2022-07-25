import { Axios } from 'axios';
import { getCookie } from 'cookies-next';

import { Ticket } from '~/types/ticketType';

const authorizationOptions = () => ({
  headers: {
    Authorization: `Bearer ${getCookie('auth')}`,
  },
});

const userAxios = new Axios({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/users`,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
  },
  timeout: 1000,
});

type FetchUserRes =
  | {
      status: 'success';
      nickname: string;
      phoneNumber: string;
      klaytnAddress: string;
    }
  | {
      status: 'failed';
    };

export const fetchUser = async (): Promise<FetchUserRes> => {
  const res = await userAxios.get(``, authorizationOptions());

  return JSON.parse(res.data);
};

type RequestUserLoginRes =
  | {
      status: 'completed';
      klaytnAddress: string;
      jwt: string;
      isNew: boolean;
    }
  | { status: 'prepared' }
  | { status: 'failed' };

export const requestUserLogin = async (requestKey: string): Promise<RequestUserLoginRes> => {
  const response = await userAxios.post(`/login`, JSON.stringify({ requestKey }));

  return JSON.parse(response.data);
};

type UpdateUserRes =
  | {
      status: 'success';
    }
  | { status: 'failed' };

export const updateUser = async (nickname: string, phoneNumber: string): Promise<UpdateUserRes> => {
  const response = await userAxios.put(
    ``,
    JSON.stringify({
      nickname,
      phoneNumber,
    }),
    authorizationOptions()
  );

  return JSON.parse(response.data);
};

export const fetchTicketsOwnedByUser = async (): Promise<Array<Ticket>> => {
  const response = await userAxios.get(`/tickets`, authorizationOptions());

  return [TICKET, TICKET, ...JSON.parse(response.data).tickets];
};

type UserValidationRes = {
  available: boolean;
};

export const userValidation = async ({ nickname }: { nickname: string }): Promise<UserValidationRes> => {
  const response = await userAxios.get(`/validation?${nickname ? `nickname=${nickname}` : ''}`);

  return JSON.parse(response.data);
};

const TICKET: Ticket = {
  id: 1,
  price: 10000,
  artistName: '디렌디',
  eventDate: new Date(2022, 11, 18).getTime(),
  eventName: '밤 하늘의 별',
  onSale: 'ON_SALE',
  tokenId: 7,
  tokenURI: '',
  eventId: 0,
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
