import Link from 'next/link';

import KlipAuthForm from '~/components/Form/KlipAuthForm';
import { event } from '~/libs/gtag';
import { useModalStore } from '~/stores/modal';
import { useUserStore } from '~/stores/user';

import MoreMenuForm from '../Form/MoreMenuForm';

import NavIcons from './NavIcons';

export default function Header() {
  const { isLoggedIn } = useUserStore();

  return (
    <header className="sticky top-0 z-10 flex justify-between w-full px-5 bg-[rgba(255,255,255,0.5)] backdrop-blur-md">
      <nav className="relative flex justify-between w-full py-6 ">
        <div className="flex flex-col justify-center">
          <Link href="/">
            <a className="translate-x-1 translate-y-1">
              <span className="font-semibold cursor-pointer ">CONNECTABLE</span>
            </a>
          </Link>
        </div>
        {isLoggedIn ? <LoggedOnIcons /> : <LoggedOffIcons />}
      </nav>
    </header>
  );
}

const LoggedOnIcons = () => {
  const { showModal } = useModalStore();

  const handleClickMenuIcon = () => {
    event({ action: 'click', category: 'engagement', label: 'menu_button', value: 1 });
    showModal(' ', <MoreMenuForm />);
  };
  return (
    <div className={`flex justify-between w-[5rem]`}>
      <NavIcons src="/images/defaultProfile.png" alt="profile" href="/my" />
      <NavIcons src="/images/menu.svg" alt="menu" onClick={handleClickMenuIcon} />
    </div>
  );
};

const LoggedOffIcons = () => {
  const { showModal } = useModalStore();

  const handleClickLoginIcon = () => {
    event({ action: 'click', category: 'engagement', label: 'login_button', value: 1 });
    showModal('로그인', <KlipAuthForm />);
  };

  const handleClickMenuIcon = () => {
    event({ action: 'click', category: 'engagement', label: 'menu_button', value: 1 });
    showModal(' ', <MoreMenuForm />);
  };

  return (
    <div className={`flex justify-between w-[5rem]`}>
      <div className=" transform scale-[-1]">
        <NavIcons src="/images/login.svg" alt="login" onClick={handleClickLoginIcon} />
      </div>
      <NavIcons src="/images/menu.svg" alt="menu" onClick={handleClickMenuIcon} />
    </div>
  );
};
