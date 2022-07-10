import axios from 'axios';

export interface PostUserLoginRes {
  status: 'completed' | 'prepared' | 'failed';
  klaytnAddress?: string;
  jwt?: string;
  isNew?: boolean;
}

export const postUserLogin = async (requestKey: string): Promise<PostUserLoginRes> => {
  const response = await axios.post(`/api/users/login`, { requestKey });
  return response.data;
};

export interface PutUserRes {
  status: 'success' | 'fail';
}

export const putUser = async (klaytnAddress: string, phoneNumber: string, nickname: string): Promise<PutUserRes> => {
  // put user

  const response = await axios.put(`/api/users`, { klaytnAddress, phoneNumber, nickname });

  return response.data;
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

export interface GetUserTicketRes {
  status: 'success' | 'failed';
  tickets: Array<Ticket>;
}

export const getUserTicket = async (): Promise<GetUserTicketRes> => {
  const response = await axios.get(`/api/users/tickets`, { withCredentials: true });

  return response.data;
};
