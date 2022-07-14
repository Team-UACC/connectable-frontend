import { useRouter } from 'next/router';

import Spinner from '~/components/Spinner';

export default function Success() {
  const router = useRouter();
  const { eventId, paymentKey, orderId, amount } = router.query;

  console.log({ eventId, paymentKey, orderId, amount });

  return (
    <section className="absolute text-center -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 min-w-[320px]">
      <h1 className=" m-auto text-[1.5rem] font-bold ">결제 승인을 요청하고 있습니다</h1>
      <div className="mt-6 whitespace-pre-line">잠시만 기다려주세요.</div>
      <div className="mt-10 ml-[120px]">
        <Spinner />
      </div>
    </section>
  );
}
