// eslint-disable-next-line import/no-named-as-default
import toast from 'react-hot-toast';

import { useModalStore } from '~/stores/modal';

import KlipAuth from '../Form/KlipAuthForm';

export default function LoginRequestToast() {
  const { showModal } = useModalStore();

  return (
    <div className="flex flex-col justify-between p-2 text-center">
      <div>로그인 후 이용해주세요.</div>
      <button
        className="mt-2 font-bold underline text-red"
        onClick={() => {
          showModal('로그인', <KlipAuth />);
          toast.dismiss();
        }}
      >
        로그인하기
      </button>
    </div>
  );
}
