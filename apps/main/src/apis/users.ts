import axios, { Axios } from 'axios';
import { getCookie } from 'cookies-next';

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

type ResponseType<T = void> =
  | {
      status: 'success';
      data: T;
    }
  | { status: 'prepared' }
  | { status: 'failed' };

type GetUserRes = {
  nickname: string;
  phoneNumber: string;
  klaytnAddress: string;
};

export const getUser = async (): Promise<ResponseType<GetUserRes>> => {
  const res = await userAxios.get(``, authorizationOptions());

  return res.data;
};

type PostUserLoginRes = {
  klaytnAddress: string;
  jwt: string;
  isNew: boolean;
};

export const postUserLogIn = async (requestKey: string): Promise<ResponseType<PostUserLoginRes>> => {
  const response = await userAxios.post(`/login`, JSON.stringify({ requestKey }));
  const ret = JSON.parse(response.data);
  if (ret.status === 'completed') return { ...ret, status: 'success' };
  return ret;
};

export const putUser = async (phoneNumber: string, nickname: string): Promise<ResponseType> => {
  const response = await userAxios.put(
    ``,
    JSON.stringify({
      phoneNumber,
      nickname,
    }),
    authorizationOptions()
  );

  return JSON.parse(response.data);
};

export type Ticket = {
  price: number;
  artistName: string;
  eventDate: Date;
  eventName: string;
  onSale: boolean;
  tokenId: number;
  tokenURI: string;
  metadata: {
    name: string;
    description: string;
    image: string;
    attributes: Array<{ trait_type: string; value: string }>;
  };
};

export const getUserTicket = async (): Promise<Array<Ticket>> => {
  const response = await axios.get(`/api/users/tickets`, { withCredentials: true });

  return response.data.tickets;
};
