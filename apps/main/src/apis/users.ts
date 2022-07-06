import axios from 'axios';

type PostUserLoginResponseType = {
  status: 'completed' | 'prepared' | 'failed';
  address?: string;
  jwt?: string;
  isNew?: boolean;
};

export const postUserLogin = async (requestKey: string): Promise<PostUserLoginResponseType> => {
  const res = await axios.post(`/api/users/login`, { requestKey });
  return res.data;
};
