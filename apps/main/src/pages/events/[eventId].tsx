import { useRouter } from 'next/router';

import { Block } from '~/components/Block';
import Button from '~/components/Button';
import EventInfo from '~/components/event/EventInfo';

export default function EventDetailPage() {
  const router = useRouter();

  const { eventId } = router.query;

  if (!eventId) <>잘못된 접속입니다. 다시 시도해주세요.</>;
  return (
    <div className="relative w-full ">
      <EventInfo eventId={Number(eventId)}></EventInfo>

      <footer className="sticky bottom-0 flex justify-between w-[calc(100%+32px)] py-4 -translate-x-4 bg-transparent backdrop-blur-md">
        <Button>결제하기</Button>
      </footer>
    </div>
  );
}
