import { Block } from '~/components/Block';
import EventCard from '~/components/event/EventCard';

const EVENT_DUMMY = [
  {
    id: 1,
    name: '[콘서트] 밤 하늘의 별',
    image: '/images/temp.jpeg',
    date: new Date('2022-07-22').getTime(),
    description: '디렌리의 전시',
    salesFrom: new Date('2022-07-11').getTime(),
    salesTo: new Date('2022-07-16').getTime(),
  },
  {
    id: 2,
    name: '[콘서트] 밤 하늘의 별',
    image: '/images/temp.jpeg',
    date: new Date('2022-07-22').getTime(),
    description: '디렌리의 전시',
    salesFrom: new Date('2022-07-11').getTime(),
    salesTo: new Date('2022-07-15').getTime(),
  },
];

export default function HomePage() {
  return (
    <div>
      <IntroContent />
      <Block />
      <ul className="">
        {EVENT_DUMMY.map(data => (
          <>
            <li
              key={data.id}
              className="p-4 transition-all ease-in-out rounded-lg cursor-pointer hover:scale-110 hover:bg-zinc-100"
            >
              <EventCard data={data} />
            </li>
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
