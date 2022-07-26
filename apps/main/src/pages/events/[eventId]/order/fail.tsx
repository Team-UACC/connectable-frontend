import { useRouter } from 'next/router';

type OrderErrorCode = 'PAY_PROCESS_CANCELED' | 'PAY_PROCESS_ABORTED' | 'REJECT_CARD_COMPANY';

const ERROR_DESCRIPTION = {
  PAY_PROCESS_CANCELED: '사용자에 의해 결제가 취소되었습니다.',
  PAY_PROCESS_ABORTED: '결제 진행 중 승인에 실패하여 결제가 중단되었습니다.',
  REJECT_CARD_COMPANY: '결제 승인이 거절되었습니다.',
};

export default function Fail() {
  const router = useRouter();
  const { eventId, code, orderId, message } = router.query;

  return (
    <section className="absolute text-center -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 min-w-[320px]">
      <h1 className=" m-auto text-[1.5rem] font-bold ">결제 요청에 실패했습니다</h1>
      <div className="mt-6 whitespace-pre-line text-red">{ERROR_DESCRIPTION[code as OrderErrorCode]}</div>
      <button
        className="mt-6 text-blue-500"
        onClick={() => {
          router.replace(`/events/${eventId}`);
        }}
      >
        이벤트 상세 페이지로 돌아가기
      </button>
    </section>
  );
}
