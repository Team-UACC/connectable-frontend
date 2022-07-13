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
      <Image src={data.image} alt="임시 이미지" width={388} height={388} style={{ borderRadius: '10px' }} />
      <h2 className="font-bold ">{data.name}</h2>
      <EventSaleTimer endTime={data.salesTo} />
    </article>
  );
}
