import Link from 'next/link';

import { fetchAllEvents } from '~/apis/events';
import EventCard from '~/components/Card/EventCard';
import Footer from '~/components/Footer';
import useEventsQuery from '~/hooks/apis/useEventsQuery';
import { EventSimpleType } from '~/types/eventType';

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
            <Link key={eventSimple.id} href={`/events/${eventSimple.id}`}>
              <a>
                <li className="p-4 mb-4 transition-all ease-in-out rounded-lg cursor-pointer [@media(hover:hover)]:hover:scale-110 hover:bg-[zinc-100]">
                  <EventCard data={eventSimple} />
                </li>
              </a>
            </Link>
          ))}
        </ul>
      </div>
      <Footer />
    </>
  );
}

const IntroContent = () => (
  <section className="relative flex flex-col w-[90%] m-auto my-4">
    <span className="text-center text-[1.3rem] font-bold mb-6 ">
      <span className="text-transparent bg-gradient-to-r bg-clip-text from-brand via-gray-400 to-brand animate-text">
        아티스트
      </span>
      와 더 가깝게
    </span>
    <span className="text-center text-[1.3rem] font-bold  mb-6">
      <span className="text-transparent bg-gradient-to-r bg-clip-text from-red via-gray-400 to-red animate-text">
        NFT
      </span>{' '}
      디지털 티켓의 새로운 패러다임
    </span>
    <span className="text-[3rem] font-bold text-center text-transparent bg-gradient-to-r bg-clip-text from-black via-red to-brand animate-text ">
      Connectable
    </span>
    <Link href={`/docs/guide`}>
      <a className="mt-6 text-lg font-bold cursor-pointer opacity-80 w-max hover:opacity-100">{`> Connectable이란?`}</a>
    </Link>
  </section>
);
