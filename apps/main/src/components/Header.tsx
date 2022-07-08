import Image from 'next/image';
import Link from 'next/link';
import { MouseEvent } from 'react';

import { useModalStore } from '~/stores/modal';
import { useUserStore } from '~/stores/user';

import KlipAuth from './auth/KlipAuth';

const MarketDescription = <span className="text-base font-semibold ">마켓플레이스 기능은 아직 준비 중이에요.</span>;
const NotificationDescription = <span className="text-base font-semibold ">알림 기능은 아직 준비 중이에요.</span>;
const MenuDescription = <span className="text-base font-semibold ">메뉴 기능은 아직 준비 중이에요.</span>;

export default function Header() {
  const { isLoggedIn } = useUserStore();

  const { showModal } = useModalStore();
  const onClickMarketIcon = () => {
    showModal('Market', MarketDescription);
  };

  const onClickNotificationIcon = () => {
    showModal('Notification', NotificationDescription);
  };

  const onClickLoginIcon = () => {
    showModal('Login', <KlipAuth />);
  };

  const onClickMenuIcon = () => {
    showModal('Menu', MenuDescription);
  };

  return (
    <>
      <header className="relative flex justify-between w-full bg-white backdrop-blur-md">
        <nav className="relative flex justify-between w-full py-[1.5rem] ">
          <div className="flex flex-col justify-center">
            <Link href="/">
              <div className="ml-4 text-2xl cursor-pointer ">LOGO</div>
            </Link>
          </div>
          <div className="flex justify-between  w-[15rem]">
            <NavIcon src="/images/ticket.svg" alt="ticket" href="/events" />
            <NavIcon src="/images/market.svg" alt="market" onClick={onClickMarketIcon} />
            <NavIcon src="/images/notification.svg" alt="notification" onClick={onClickNotificationIcon} />
            {isLoggedIn === true ? (
              <NavIcon src="/images/defaultProfile.jpeg" alt="profile" href="/my" />
            ) : (
              <NavIcon src="/images/login.svg" alt="login" onClick={onClickLoginIcon} />
            )}
            <NavIcon src="/images/menu.svg" alt="menu" onClick={onClickMenuIcon} />
          </div>
        </nav>
      </header>
    </>
  );
}

type NavIconButtonProps = {
  src: string;
  alt: string;
  href?: string;
  width?: number;
  height?: number;
  onClick?: (e: MouseEvent) => void;
};

const NavIcon = ({ src, alt, href, width = 24, height = 24, onClick }: NavIconButtonProps) => {
  if (!href)
    return (
      <button onClick={onClick}>
        <div className="flex flex-col justify-center cursor-pointer h-[3rem] w-[3rem] rounded-full transition-all ease-in-out hover:scale-110 hover:bg-gray-100">
          <Image src={src} alt={alt} width={width} height={height} />
        </div>
      </button>
    );
  else
    return (
      <Link href={href}>
        <div className="flex flex-col justify-center cursor-pointer h-[3rem] w-[3rem] rounded-full transition-all ease-in-out hover:scale-110 hover:bg-gray-100">
          <Image src={src} alt={alt} width={width} height={height} />
        </div>
      </Link>
    );
};
