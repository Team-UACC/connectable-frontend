import Image from 'next/image';

export default function Header() {
  return (
    <header className="relative flex justify-between w-full bg-white backdrop-blur-md">
      <nav className="relative flex justify-between w-full py-[2.125rem] ">
        <div className="text-xl ">LOGO</div>
        <div className="flex justify-between text-base leading-6 w-52">
          <Image src="/images/ticket.svg" alt="ticket" width={24} height={24} />
          <Image src="/images/market.svg" alt="ticket" width={24} height={24} />
          <Image src="/images/notification.svg" alt="ticket" width={24} height={24} />
          <Image src="/images/login.svg" alt="ticket" width={24} height={24} />
          <Image src="/images/menu.svg" alt="ticket" width={24} height={24} />
        </div>
      </nav>
    </header>
  );
}
