import Image from 'next/image';

import Timer from '../Timer';

import EventSaleTimer from './EventSaleTimer';

interface EventCardProps {
  data: {
    id: number;
    name: string;
    image: string;
    date: number;
    description: string;
    salesFrom: number;
    salesTo: number;
  };
}

export default function EventCard({ data }: EventCardProps) {
  return (
    <article>
      <Image src={'/images/temp.jpeg'} alt="임시 이미지" width={388} height={388} style={{ borderRadius: '10px' }} />
      <h2 className="font-bold ">[콘서트] 밤 하늘의 별</h2>
      <EventSaleTimer endTime={data.salesTo} />
    </article>
  );
}
