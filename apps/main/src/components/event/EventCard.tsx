import Image from 'next/image';

import { EventSimpleType } from '~/types/eventType';

import EventSaleTimer from './EventInfo/EventSaleTimer';

interface Props {
  data: EventSimpleType;
}

export default function EventCard({ data }: Props) {
  return (
    <article className="w-full ">
      <Image
        src={data.image}
        alt="임시 이미지"
        width={388}
        height={388}
        objectFit="cover"
        className=" rounded-[10px]"
      />
      <h2 className="font-bold ">{data.name}</h2>
      <EventSaleTimer endTime={data.salesTo} />
      <br />
    </article>
  );
}
