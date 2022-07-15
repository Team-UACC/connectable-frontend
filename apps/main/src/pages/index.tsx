import Link from 'next/link';
import { useQuery } from 'react-query';

import { getAllEvents, GetEventRes } from '~/apis/events';
import { Block } from '~/components/Block';
import EventCard from '~/components/event/EventCard';
import Footer from '~/components/Footer';

export const EVENT_DUMMY = [
  {
    id: 2,
    name: '[콘서트] 밤 하늘의 별',
    image: '/images/temp.jpeg',
    date: new Date(2022, 6, 22).getTime() / 1000 - 9 * 60 * 60,
    description: '디렌리의 전시',
    salesFrom: new Date(2022, 6, 11).getTime() / 1000 - 9 * 60 * 60,
    salesTo: new Date(2022, 6, 17).getTime() / 1000 - 9 * 60 * 60,
  },
  {
    id: 3,
    name: '[콘서트] 밤 하늘의 별',
    image: '/images/temp.jpeg',
    date: new Date(2022, 6, 22).getTime() / 1000 - 9 * 60 * 60,
    description: '디렌리의 전시',
    salesFrom: new Date(2022, 6, 11).getTime() / 1000 - 9 * 60 * 60,
    salesTo: new Date(2022, 6, 17).getTime() / 1000 - 9 * 60 * 60,
  },
];

export async function getStaticProps() {
  const posts = [...EVENT_DUMMY, ...(await getAllEvents())];
  return {
    props: { posts },
  };
}

interface Props {
  posts: GetEventRes;
}

export default function IndexPage({ posts }: Props) {
  const { data, isLoading } = useQuery(['posts'], getAllEvents, { initialData: posts });

  if (isLoading) return 'loading';
  return (
    <>
      <div>
        <Block />
        <IntroContent />
        <Block />
        <ul className="">
          {data!.map(data => (
            <>
              <Link key={data.id} href={`/events/${data.id}`}>
                <li className="p-4 transition-all ease-in-out rounded-lg cursor-pointer hover:scale-110 hover:bg-[zinc-100]">
                  <EventCard data={data} />
                </li>
              </Link>
              <Block />
              <Block />
            </>
          ))}
        </ul>
      </div>
      <Footer />
    </>
  );
}

const IntroContent = () => (
  <section className="relative flex flex-col w-[90%] m-auto">
    <span className="text-[1.3rem] font-semibold  text-red mb-6 ">아티스트와 더 가깝게</span>
    <span className="text-end text-[1.3rem] font-semibold  text-brand mb-6">디지털 티켓의 새로운 패러다임</span>
    <span className="text-[3rem] font-bold text-center text-transparent bg-gradient-to-r bg-clip-text from-[#63171B] via-white to-[#1A365D] animate-text ">
      Connectable
    </span>
  </section>
);
