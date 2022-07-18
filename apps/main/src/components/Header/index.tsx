import Link from 'next/link';

import KlipAuth from '~/components/auth/KlipAuth';
import { useModalStore } from '~/stores/modal';
import { useUserStore } from '~/stores/user';

import MoreMenu from '../MoreMenu';

import NavIcons from './NavIcons';

const MarketDescription = <span className="text-base font-semibold ">마켓플레이스 기능은 아직 준비 중이에요.</span>;
const NotificationDescription = <span className="text-base font-semibold ">알림 기능은 아직 준비 중이에요.</span>;

export default function Header() {
  const { isLoggedIn } = useUserStore();

  return (
    <header className="sticky top-0 z-10 flex justify-between w-full px-5 bg-transparent backdrop-blur-md">
      <nav className="relative flex justify-between w-full py-6 ">
        <div className="flex flex-col justify-center">
          <Link href="/">
            <div className="text-2xl cursor-pointer ">LOGO</div>
          </Link>
        </div>
        {isLoggedIn ? <LoggedOnIcons /> : <LoggedOffIcons />}
      </nav>
    </header>
  );
}

const LoggedOnIcons = () => {
  const { showModal } = useModalStore();
  const handleClickMarketIcon = () => {
    showModal('마켓플레이스', MarketDescription);
  };

  const handleClickNotificationIcon = () => {
    showModal('알림', NotificationDescription);
  };

  const handleClickMenuIcon = () => {
    showModal(' ', <MoreMenu />);
  };
  return (
    <div className={`flex justify-between w-[12rem]`}>
      <NavIcons src="/images/market.svg" alt="market" onClick={handleClickMarketIcon} />
      <NavIcons src="/images/notification.svg" alt="notification" onClick={handleClickNotificationIcon} />
      <NavIcons src="/images/defaultProfile.jpeg" alt="profile" href="/my" />
      <NavIcons src="/images/menu.svg" alt="menu" onClick={handleClickMenuIcon} />
    </div>
  );
};

const LoggedOffIcons = () => {
  const { showModal } = useModalStore();

  const handleClickLoginIcon = () => {
    showModal('로그인', <KlipAuth />);
  };

  const handleClickMenuIcon = () => {
    showModal(' ', <MoreMenu />);
  };

  return (
    <div className={`flex justify-between w-[5rem]`}>
      <NavIcons src="/images/login.svg" alt="login" onClick={handleClickLoginIcon} />
      <NavIcons src="/images/menu.svg" alt="menu" onClick={handleClickMenuIcon} />
    </div>
  );
};
