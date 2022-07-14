import Image from 'next/image';
import { useRouter } from 'next/router';

import { Block } from '~/components/Block';
import Button from '~/components/Button';
import Footer from '~/components/Footer';
import WithAuth from '~/components/HOC/WithAuth';
import Tabs from '~/components/Tabs';
import { TextInfoLine } from '~/components/TextInfo';
import UserTicketCardList from '~/components/ticket/UserTicketCardList';
import ProfileEditForm from '~/components/user/ProfileEditForm';
import { useLogout } from '~/hooks/useAuth';
import { useModalStore } from '~/stores/modal';
import { useUserStore } from '~/stores/user';

function MyPage() {
  const router = useRouter();

  const { userName, klaytnAddress, phoneNumber } = useUserStore();
  const { showModal } = useModalStore();
  const logOut = useLogout();

  const titles = ['마이 티켓', '거래 내역'];

  const onClickLogout = () => {
    router.replace('/');
    logOut();
  };

  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex flex-col items-center justify-evenly w-full h-[24rem] border-b-[1px] border-brand">
        <Image
          src="/images/defaultProfile.jpeg"
          alt={'프로필 이미지'}
          width={100}
          height={100}
          style={{ borderRadius: '50%' }}
        />
        <h1 className="text-3xl font-bold text-center ">{userName}</h1>
        <div className="w-full px-12 ">
          <TextInfoLine header="Klip 주소" info={klaytnAddress} hasCopy={true} />
          <TextInfoLine header="전화번호" info={phoneNumber} />
        </div>
        <div className="flex w-full ">
          <Button
            onClick={() => showModal('프로필 수정', <ProfileEditForm userName={userName} phoneNumber={phoneNumber} />)}
          >
            프로필 수정
          </Button>
          <Button color="white" onClick={onClickLogout}>
            로그아웃
          </Button>
        </div>
      </div>
      <div className="w-full">
        <Block />
        <Tabs titles={titles} color="brand">
          <UserTicketCardList />
        </Tabs>
      </div>
      <Footer />
    </div>
  );
}

export default WithAuth(MyPage);
