import Image from 'next/image';
import { useRouter } from 'next/router';

import Button from '~/components/Button';
import Footer from '~/components/Footer';
import ProfileEditForm from '~/components/Form/ProfileEditForm';
import WithAuth from '~/components/HOC/WithAuth';
import UserOrderStatusList from '~/components/Order/UserOrderStatusList';
import Tabs from '~/components/Tabs';
import TextInfo from '~/components/TextInfo';
import UserTicketCardList from '~/components/Tickets/UserTicketCardList';
import { useLogout } from '~/hooks/useAuth';
import { useModalStore } from '~/stores/modal';
import { useUserStore } from '~/stores/user';

function MyPage() {
  const router = useRouter();

  const { userName, klaytnAddress, phoneNumber } = useUserStore();
  const { showModal } = useModalStore();
  const logOut = useLogout();

  const titles = ['마이 티켓', '거래 내역'];

  const handleClickLogout = () => {
    router.replace('/').then(() => logOut());
  };

  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex flex-col items-center justify-evenly w-full h-[24rem] border-b-[1px] border-brand">
        <Image
          src="/images/defaultProfile.png"
          alt={'프로필 이미지'}
          width={100}
          height={100}
          style={{ borderRadius: '50%' }}
        />
        <h1 className="text-3xl font-bold text-center ">{userName}</h1>
        <div className="w-full px-12 ">
          <TextInfo.Line term="Klip 주소" description={klaytnAddress} hasCopy={true} />
          <TextInfo.Line term="전화번호" description={phoneNumber} />
        </div>
        <div className="flex w-full ">
          <Button
            onClick={() => showModal('프로필 수정', <ProfileEditForm userName={userName} phoneNumber={phoneNumber} />)}
          >
            프로필 수정
          </Button>
          <Button color="white" onClick={handleClickLogout}>
            로그아웃
          </Button>
        </div>
      </div>
      <div className="w-full mt-6">
        <Tabs titles={titles} color="brand">
          <UserTicketCardList />
          <UserOrderStatusList />
        </Tabs>
      </div>
      <Footer />
    </div>
  );
}

export default WithAuth(MyPage);
