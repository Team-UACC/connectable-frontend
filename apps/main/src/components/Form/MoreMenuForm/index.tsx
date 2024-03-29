import Link from 'next/link';

import { useModalStore } from '~/stores/modal';

import { MarketDescription, NotificationDescription } from './TempDescroption';

export default function MoreMenu() {
  const { setModalContent } = useModalStore();

  const MENU: Array<{ name: string; href?: string; handleClick?: () => any }> = [
    // { name: '마켓플레이스', handleClick: () => setModalContent('마켓플레이스', <MarketDescription />) },
    // { name: '알림', handleClick: () => setModalContent('알림', <NotificationDescription />) },
    { name: '1:1 문의하기', href: 'docs/chat' },
    { name: 'Connectable 안내서', href: 'docs/guide' },
    { name: '이용약관', href: 'docs/terms-of-service' },
    { name: '개인정보처리방침', href: 'docs/privacy-policy' },
  ];

  return (
    <section className="absolute top-[6rem] left-[2rem] text-base font-semibold text-start w-4/5 ">
      <ul>
        {MENU.map(term => {
          if (term.href === undefined) {
            return (
              <li className="w-full mb-2 leading-[3rem] cursor-pointer hover:font-bold hover:text-lg hover:leading-[3rem]">
                <button className="w-full text-start" onClick={term.handleClick}>
                  {term.name}
                </button>
              </li>
            );
          }
          return (
            <Link key={term.name} href={`/${term.href}`} passHref>
              <a>
                <li className="w-full mb-2 leading-[3rem] cursor-pointer hover:font-bold hover:text-lg hover:leading-[3rem]">
                  {term.name}
                </li>
              </a>
            </Link>
          );
        })}
      </ul>
    </section>
  );
}
