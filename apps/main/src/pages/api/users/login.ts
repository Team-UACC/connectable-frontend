import { setCookie } from 'cookies-next';
import { NextApiRequest, NextApiResponse } from 'next';

export default (req: NextApiRequest, res: NextApiResponse) => {
  //  서버에  request
  setCookie('jwt', 'jwt', { req, res, maxAge: 60 * 24, httpOnly: true, secure: true, sameSite: 'strict' });

  res.status(200).json({
    status: 'completed',
    klaytnAddress: '0xD466B3aafb86446FFC44868284a9FB76A0ae8BCb',
    isNew: false, // 회원가입이 된 유저 구분
  });
};
