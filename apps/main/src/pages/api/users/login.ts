import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

import { PostUserLoginRes } from '~/apis/users';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { requestKey } = req.body;

    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/users/login`, { requestKey });

    console.log(res);
    res.json(response.data as PostUserLoginRes);
  }
};
