import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

const DUMMY_DATA = {
  price: 10000,
  artistName: '디렌디',
  eventDate: new Date('2022-11-18'),
  eventName: '밤 하늘의 별',
  onSale: false,
  tokenId: 7,
  tokenURI: '',
  contractAddress: '0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D',
  eventId: 2,
  metadata: {
    name: '밤 하늘의 별 #7',
    description:
      '별이 빛나는 세상을 걸어가고 있는 호랑이의 모습은 우리 삶의 모습으로 비유합니다. 빛나는 세계를 가슴 속에 품고 보이지 않고 뚜렷하지 않는 세상을 걸어가지만, 세상의 달빛은 내 눈과 가슴속 구슬에도 또렷이 맺혀 있습니다. 두 개의 달이 함께 하는 이곳은 현실의 공간을 넘어 어딘가로, 저마다 마음속에 품고 있는 길을 우린 언제나 걷고 있습니다. 달빛의 끝에서 나를 만나고, 저마다 품고 있는 희망을 발견할 수 있기를 희망합니다.',
    image:
      'https://assets.otherside.xyz/otherdeeds/871079decce602d36188f532fe6623a15d8c6817ecd3bcd9b0c3a2933bb51c3b.jpg',
    attributes: [
      { trait_type: 'Category', value: 'Volcanic' },
      { trait_type: 'Sediment', value: 'Biogenic Swamp' },
      { trait_type: 'Sediment Tier', value: '2' },
      { trait_type: 'Environment', value: 'Obsidian' },
      { trait_type: 'Environment Tier', value: '1' },
      { trait_type: 'Western Resource', value: 'Brimstone' },
      { trait_type: 'Western Resource Tier', value: '3' },
      { trait_type: 'Northern Resource', value: 'Abyssia' },
      { trait_type: 'Northern Resource Tier', value: '3' },
      { trait_type: 'Plot', value: '1' },
    ],
  },
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    // const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/tickets`, { withCredentials: true });

    res.json({
      status: 'success',
      tickets: [DUMMY_DATA, DUMMY_DATA, DUMMY_DATA, DUMMY_DATA, DUMMY_DATA, DUMMY_DATA, DUMMY_DATA, DUMMY_DATA],
    });
  }
};
