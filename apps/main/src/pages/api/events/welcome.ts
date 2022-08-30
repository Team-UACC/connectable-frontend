import { NextApiRequest, NextApiResponse } from 'next';

import { EventDetailType } from '~/types/eventType';

export const WELCOME_EVENT_DETAIL: EventDetailType = {
  id: 0,
  name: 'Connectable 웰컴 티켓',
  image: '/images/welcome2.PNG',
  date: 0,
  description: 'Connectable 웰컴 티켓 NFT를 무료로 받으세요.',
  salesFrom: 0,
  salesTo: 0,
  artistName: 'UACC',
  artistImage: '/images/welcome.PNG',
  twitterUrl: 'connectable.fans',
  instagramUrl: '',
  webpageUrl: '',
  totalTicketCount: 5000,
  onSaleTicketCount: 5000,
  startTime: 0,
  endTime: 0,
  price: 0,
  location: 'Conncetable.fans',
  salesOption: 'FLAT_PRICE', // FLAT_PRICE(균일가), FLEXIBLE_PRICE(균일가 아님)
  contractAddress: '',
  openseaUrl: '', // opensea에서 컬렉션을 조회할 수 있는 url
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    res.json(WELCOME_EVENT_DETAIL);
  }
};
