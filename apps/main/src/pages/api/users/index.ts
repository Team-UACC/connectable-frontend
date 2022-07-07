import { getCookie } from 'cookies-next';
import { NextApiRequest, NextApiResponse } from 'next';

export interface GetUserLoginRes {
  status: string;
  nickname: string;
  phoneNumber: string;
  klaytnAddress: string;
  isNew: boolean;
}

export default (req: NextApiRequest, res: NextApiResponse) => {
  const jwt = getCookie('auth', { req });

  if (!jwt) res.json({ status: 'fail' });
  else
    res.json({
      status: 'success',
      nickname: 'UACC',
      phoneNumber: '010-1234-5678',
      klaytnAddress: '0xD466B3aafb86446FFC44868284a9FB76A0ae8BCb',
    } as GetUserLoginRes);
};
