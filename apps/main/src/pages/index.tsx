import Link from 'next/link';
import { useQuery } from 'react-query';

import { getEvents, GetEventRes } from '~/apis/events';
import { Block } from '~/components/Block';
import EventCard from '~/components/event/EventCard';

// const EVENT_DUMMY = [
//   {
//     id: 1,
//     name: '[콘서트] 밤 하늘의 별',
//     image: '/images/temp.jpeg',
//     date: new Date('2022-07-22').getTime(),
//     description: '디렌리의 전시',
//     salesFrom: new Date('2022-07-11').getTime(),
//     salesTo: new Date('2022-07-16').getTime(),
//   },
//   {
//     id: 2,
//     name: '[콘서트] 밤 하늘의 별',
//     image: '/images/temp.jpeg',
//     date: new Date('2022-07-22').getTime(),
//     description: '디렌리의 전시',
//     salesFrom: new Date('2022-07-11').getTime(),
//     salesTo: new Date('2022-07-15').getTime(),
//   },
//   {
//     id: 3,
//     name: '조엘의 콘서트',
//     image: 'https://connectable-events.s3.ap-northeast-2.amazonaws.com/image_0xtest.jpeg',
//     date: 1659344400,
//     description: '조엘의 콘서트 at Connectable',
//     salesFrom: 1657551600,
//     salesTo: 1659106800,
//   },
// ];

export async function getStaticProps() {
  const posts = await getEvents();
  return {
    props: { posts },
  };
}

type IndexPageProps = {
  posts: GetEventRes;
};

export default function IndexPage({ posts }: IndexPageProps) {
  const { data, isLoading } = useQuery(['posts'], getEvents, { initialData: posts });

  if (isLoading) return 'loading';
  return (
    <div>
      <Block />
      <IntroContent />
      <Block />
      <ul className="">
        {data!.map(data => (
          <>
            <Link href={`/events/${data.id}`}>
              <li
                key={data.id}
                className="p-4 transition-all ease-in-out rounded-lg cursor-pointer hover:scale-110 hover:bg-zinc-100"
              >
                <EventCard data={data} />
              </li>
            </Link>
            <Block />
            <Block />
          </>
        ))}
      </ul>
    </div>
  );
}

const IntroContent = () => (
  <div className="relative flex flex-col w-[90%] m-auto">
    <span className="text-[1.25rem] font-semibold  text-red mb-6 ">아티스트와 더 가깝게</span>
    <span className="text-end text-[1.25rem] font-semibold  text-brand mb-6">디지털 티켓의 새로운 패러다임</span>
    <span className="mb-6 text-4xl font-bold text-center text-transparent bg-gradient-to-r bg-clip-text from-[#63171B] via-white to-[#1A365D] animate-text ">
      Connectable
    </span>
  </div>
);
