import { Ticket } from '~/types/ticketType';

import { authorizationOptions, axiosInstance } from '.';

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
  return axiosInstance.get(`/users`, authorizationOptions());
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
  return axiosInstance.post(`/users/login`, JSON.stringify({ requestKey }));
};

type UpdateUserRes =
  | {
      status: 'success';
    }
  | { status: 'failed' };

export const updateUser = async (nickname: string, phoneNumber: string): Promise<UpdateUserRes> => {
  return axiosInstance.put(
    `/users`,
    JSON.stringify({
      nickname,
      phoneNumber,
    }),
    authorizationOptions()
  );
};

type FetchTicketsOwnedByUserRes = { status: 'success' | 'failed'; tickets: Array<Ticket> };

export const fetchTicketsOwnedByUser = async (): Promise<Array<Ticket>> => {
  const response: FetchTicketsOwnedByUserRes = await axiosInstance.get(`/users/tickets`, authorizationOptions());

  return response.tickets;
};

type UserValidationRes = {
  available: boolean;
};

export const userValidation = async ({ nickname }: { nickname: string }): Promise<UserValidationRes> => {
  return axiosInstance.get(`/users/validation?${nickname ? `nickname=${nickname}` : ''}`);
};
