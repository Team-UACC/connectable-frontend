import axios from 'axios';

export interface PostUserLoginRes {
  status: 'completed' | 'prepared' | 'failed';
  klaytnAddress?: string;
  jwt?: string;
  isNew?: boolean;
}

export interface PutUserRes {
  status: 'success' | 'fail';
}

export const postUserLogin = async (requestKey: string): Promise<PostUserLoginRes> => {
  const res = await axios.post(`/api/users/login`, { requestKey });
  return res.data;
};

export const putUser = async (klaytnAddress: string, phoneNumber: string, nickname: string): Promise<PutUserRes> => {
  // put user

  const res = await axios.put(`/api/users`, { klaytnAddress, phoneNumber, nickname });

  return { status: 'success' }; // res.data
};
