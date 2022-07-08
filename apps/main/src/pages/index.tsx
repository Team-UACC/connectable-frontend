import commonText from '@packages/common';
import Image from 'next/image';

import { Block } from '~/components/Block';

export default function HomePage() {
  return (
    <div>
      <IntroContent />
      <Block />
      <EventCard />
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

const EventCard = () => {
  return (
    <>
      <Image src={'/images/temp.jpeg'} alt="임시 이미지" width={388} height={388} style={{ borderRadius: '10px' }} />
      <h2 className="font-bold ">[콘서트] 밤 하늘의 별</h2>
      <span className="text-sm font-semibold opacity-50 ">판매 종료까지 03일 06시간 10분 00초 남았습니다.</span>
    </>
  );
};
