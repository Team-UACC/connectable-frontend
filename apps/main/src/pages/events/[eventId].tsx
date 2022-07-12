import { useRouter } from 'next/router';
import toast from 'react-hot-toast';

import Button from '~/components/Button';
import EventInfo from '~/components/event/EventInfo';
import { useUserStore } from '~/stores/user';

export default function EventDetailPage() {
  const router = useRouter();
  const { isLoggedIn } = useUserStore();

  const { eventId } = router.query;

  if (!eventId) <>잘못된 접속입니다. 다시 시도해주세요.</>;
  return (
    <div className="relative w-full ">
      <EventInfo eventId={Number(eventId)}></EventInfo>

      <footer className="sticky bottom-0 flex justify-between w-[calc(100%+32px)] py-4 -translate-x-4 bg-transparent backdrop-blur-md">
        <Button
          onClick={() => {
            if (!isLoggedIn) {
              toast.error('로그인 후 이용해주세요.');
            } else toast.success('준비중입니다.');
          }}
        >
          결제하기
        </Button>
      </footer>
    </div>
  );
}
