import axios, { Axios } from 'axios';
import { getCookie } from 'cookies-next';

import { TicketType } from '~/types/ticketType';

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

export const putUser = async (nickname: string, phoneNumber: string): Promise<PutUserRes> => {
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

export const getUserTicket = async (): Promise<Array<TicketType>> => {
  const response = await axios.get(`/api/users/tickets`, { withCredentials: true });

  return response.data.tickets;
};
