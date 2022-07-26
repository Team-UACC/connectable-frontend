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

  return JSON.parse(response.data).tickets;
};

type UserValidationRes = {
  available: boolean;
};

export const userValidation = async ({ nickname }: { nickname: string }): Promise<UserValidationRes> => {
  const response = await userAxios.get(`/validation?${nickname ? `nickname=${nickname}` : ''}`);

  return JSON.parse(response.data);
};
