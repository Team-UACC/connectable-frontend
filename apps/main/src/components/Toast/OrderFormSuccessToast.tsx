import Link from 'next/link';
// eslint-disable-next-line import/no-named-as-default
import toast from 'react-hot-toast';

export default function OrderFormSuccessToast() {
  return (
    <div className="flex flex-col justify-between p-2 text-center">
      <div>성공적으로 반영되었습니다.</div>
      <span>
        <Link href={`/my`}>
          <a
            className="mt-2 font-bold underline text-red"
            onClick={() => {
              toast.dismiss();
            }}
          >
            마이페이지
          </a>
        </Link>
        에서 확인하세요.
      </span>
    </div>
  );
}
