import { Block } from '~/components/Block';
import ProfileInfo from '~/components/ProfileInfo';
import Tabs from '~/components/Tabs';
import UserTicketCardList from '~/components/ticket/UserTicketCardList';

export default function MyPage() {
  const titles = ['마이 티켓', '거래 내역'];

  return (
    <div className="flex flex-col items-center w-full divide-y-[1px] divide-brand">
      <ProfileInfo />
      <div className="w-full">
        <Block />
        <Tabs titles={titles} color="brand">
          <UserTicketCardList />
        </Tabs>
      </div>
    </div>
  );
}
