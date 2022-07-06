import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({
    status: 'completed',
    klaytnAddress: '0xD466B3aafb86446FFC44868284a9FB76A0ae8BCb',
    jwt: 'jwt',
    isNew: false, // 회원가입이 된 유저 구분
  });
}
