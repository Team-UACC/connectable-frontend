import axios from 'axios';

export interface PostUserLoginRes {
  status: 'completed' | 'prepared' | 'failed';
  klaytnAddress?: string;
  jwt?: string;
  isNew?: boolean;
}

export const postUserLogin = async (requestKey: string): Promise<PostUserLoginRes> => {
  const res = await axios.post(`/api/users/login`, { requestKey });
  return res.data;
};

export const putUser = async (klaytnAddress: string, phoneNumber: string, nickName: string) => {
  // put user

  return { status: 'success' }; // res.data
};
