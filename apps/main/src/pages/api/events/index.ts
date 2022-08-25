import { NextApiRequest, NextApiResponse } from 'next';

import { EventSimpleType } from '~/types/eventType';

export const WELCOME_EVENT_SIMPLE: EventSimpleType = {
  id: 0,
  name: 'Connectable 웰컴 티켓',
  image: '/images/welcome2.PNG',
  date: 0,
  description: 'Connectable 웰컴 티켓 NFT를 무료로 받으세요.',
  salesFrom: 0,
  salesTo: 0,
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    res.json(WELCOME_EVENT_SIMPLE);
  }
};
