import Image from 'next/image';

import EventSaleTimer from '~/components/Events/EventSaleTimer';
import { IMAGE_BLUR_DATA_URL } from '~/constants/contents';
import { EventSimpleType } from '~/types/eventType';

interface Props {
  data: EventSimpleType;
}

export default function EventCard({ data }: Props) {
  return (
    <article className="w-full ">
      <div className="relative ">
        <div className="absolute inset-x-0 bottom-0 z-10 h-[4rem] bg-gradient-to-t from-[rgba(255,255,255,0.5)]" />
        <Image
          src={data.image}
          alt={data.name}
          width={388}
          height={388}
          objectFit="cover"
          className=" rounded-[10px]"
          placeholder="blur"
          blurDataURL={IMAGE_BLUR_DATA_URL}
        />
      </div>
      <div className="mt-2 ml-1 ">
        <h2 className="font-bold ">{data.name}</h2>
        <EventSaleTimer endTime={data.salesTo} />
      </div>
    </article>
  );
}
