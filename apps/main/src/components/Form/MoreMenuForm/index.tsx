import Link from 'next/link';

import { useModalStore } from '~/stores/modal';

const MENU = [
  { name: 'Connectable 안내서', href: 'guide' },
  { name: '1:1 문의하기', href: 'chat' },
  { name: '이용약관', href: 'terms-of-service' },
  { name: '개인정보처리방침', href: 'privacy-policy' },
];
export default function MoreMenu() {
  const { hideModal } = useModalStore();
  return (
    <section className="absolute top-[6rem] left-[2rem] text-base font-semibold text-start w-4/5 ">
      <ul>
        {MENU.map(term => (
          <Link key={term.name} href={`/docs/${term.href}`}>
            <a onClick={() => hideModal()}>
              <li className="w-full mb-2 leading-[3rem] cursor-pointer hover:font-bold hover:text-lg hover:leading-[3rem]">
                {term.name}
              </li>
            </a>
          </Link>
        ))}
      </ul>
    </section>
  );
}
