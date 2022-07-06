import Image from 'next/image';
import Link from 'next/link';
import { MouseEvent } from 'react';

export default function Header() {
  return (
    <header className="relative flex justify-between w-full bg-white backdrop-blur-md">
      <nav className="relative flex justify-between w-full py-[1.5rem] ">
        <div className="flex flex-col justify-center">
          <Link href="/">
            <div className="text-2xl cursor-pointer">LOGO</div>
          </Link>
        </div>
        <div className="flex justify-between  w-[15rem]">
          <NavIcon src="/images/ticket.svg" alt="ticket" href="/events" />
          <NavIcon src="/images/market.svg" alt="market" href="/events" />
          <NavIcon src="/images/notification.svg" alt="notification" href="/events" />
          <NavIcon src="/images/login.svg" alt="login" href="/events" />
          <NavIcon src="/images/menu.svg" alt="menu" href="/events" />
        </div>
      </nav>
    </header>
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
