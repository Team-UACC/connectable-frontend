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

type GetUserRes =
  | {
      status: 'success';
      nickname: string;
      phoneNumber: string;
      klaytnAddress: string;
    }
  | {
      status: 'failed';
    };

export const getUser = async (): Promise<GetUserRes> => {
  const res = await userAxios.get(``, authorizationOptions());

  return JSON.parse(res.data);
};

type PostUserLoginRes =
  | {
      status: 'completed';
      klaytnAddress: string;
      jwt: string;
      isNew: boolean;
    }
  | { status: 'prepared' }
  | { status: 'failed' };

export const postUserLogIn = async (requestKey: string): Promise<PostUserLoginRes> => {
  const response = await userAxios.post(`/login`, JSON.stringify({ requestKey }));

  return JSON.parse(response.data);
};

type PutUserRes =
  | {
      status: 'success';
    }
  | { status: 'failed' };

export const putUser = async (phoneNumber: string, nickname: string): Promise<PutUserRes> => {
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
  contractAddress: string;
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
