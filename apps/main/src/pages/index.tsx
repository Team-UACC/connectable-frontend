import Link from 'next/link';

import { fetchAllEvents } from '~/apis/events';
import EventCard from '~/components/Card/EventCard';
import Footer from '~/components/Footer';
import useEventsQuery from '~/hooks/apis/useEventsQuery';
import { useScrollFadeIn } from '~/hooks/useScrollFadeIn';
import { EventSimpleType } from '~/types/eventType';

export const EVENT_DUMMY = [
  {
    id: 2,
    name: '[콘서트] 밤 하늘의 별',
    image: '/images/temp.jpeg',
    date: new Date(2022, 6, 22).getTime(),
    description: '디렌리의 전시',
    salesFrom: new Date(2022, 6, 11).getTime(),
    salesTo: new Date(2022, 6, 17).getTime(),
  },
  {
    id: 3,
    name: '[콘서트] 밤 하늘의 별',
    image: '/images/temp.jpeg',
    date: new Date(2022, 6, 22).getTime(),
    description: '디렌리의 전시',
    salesFrom: new Date(2022, 6, 11).getTime(),
    salesTo: new Date(2022, 6, 17).getTime(),
  },
];

export async function getStaticProps() {
  const posts = await fetchAllEvents();
  return {
    props: { posts },
  };
}

interface Props {
  posts: Array<EventSimpleType>;
}

export default function IndexPage({ posts }: Props) {
  const { data: EventsList, isLoading } = useEventsQuery({ initialData: posts });

  if (isLoading) return 'loading';
  return (
    <>
      <div>
        <IntroContent />
        <ul>
          {EventsList?.map(eventSimple => (
            <div key={eventSimple.id} {...useScrollFadeIn({})}>
              <Link href={`/events/${eventSimple.id}`}>
                <a>
                  <li className="p-4 mb-4 transition-all ease-in-out rounded-lg cursor-pointer hover:scale-110 hover:bg-[zinc-100]">
                    <EventCard data={eventSimple} />
                  </li>
                </a>
              </Link>
            </div>
          ))}
        </ul>
      </div>
      <Footer />
    </>
  );
}

const IntroContent = () => (
  <section className="relative flex flex-col w-[90%] m-auto my-4">
    <span className="text-[1.3rem] font-semibold  text-red mb-6 ">아티스트와 더 가깝게</span>
    <span className="text-end text-[1.3rem] font-semibold  text-brand mb-6">디지털 티켓의 새로운 패러다임</span>
    <span className="text-[3rem] font-bold text-center text-transparent bg-gradient-to-r bg-clip-text from-[#63171B] via-white to-[#1A365D] animate-text ">
      Connectable
    </span>
  </section>
);
