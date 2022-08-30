import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const { phoneNumber, duration } = req.query;
    console.log(phoneNumber, duration);
    res.json('123456');
  }
};
