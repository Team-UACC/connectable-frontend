import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const { certificationKey } = req.query;

    res.json(certificationKey === '123456');
  }
};
