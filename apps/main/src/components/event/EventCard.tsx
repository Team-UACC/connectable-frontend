import Image from 'next/image';

import Timer from '../Timer';

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
      <span className="text-sm font-semibold opacity-50 ">
        판매 종료까지{' '}
        <span className=" text-red">
          <Timer endTime={data.salesTo} />
        </span>{' '}
        남았습니다.
      </span>
    </article>
  );
}
