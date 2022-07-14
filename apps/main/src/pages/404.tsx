import { useRouter } from 'next/router';

export default function NotFoundPage() {
  const router = useRouter();
  return (
    <section className="absolute text-center -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 min-w-[320px]">
      <h1 className=" m-auto text-[4rem] font-bold ">404 Error</h1>
      <div className="whitespace-pre-line">
        요청하신 페이지를 찾을 수 없습니다.
        <br />
        입력하신 주소가 정확한지 다시 한번 확인해주세요.
      </div>
      <button
        className="mt-6 text-blue-500"
        onClick={() => {
          router.back();
        }}
      >
        이전 페이지로 돌아가기
      </button>
    </section>
  );
}
