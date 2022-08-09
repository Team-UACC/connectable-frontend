import Link from 'next/link';

import { BUISNESS } from '~/constants/company';

import Text from '../Text';

const OFFICE_TERMS = [
  { name: '이용약관', href: 'terms-of-service' },
  { name: '개인정보처리방침', href: 'privacy-policy' },
];
export default function Footer() {
  return (
    <footer className="w-full py-8 border-t-[1px] border-gray-300">
      <section>
        <div className="px-2">
          <ul className="flex ">
            {OFFICE_TERMS.map(term => (
              <Link key={term.name} href={`/docs/${term.href}`}>
                <li className="mr-6 cursor-pointer">
                  <Text>{term.name}</Text>
                </li>
              </Link>
            ))}
          </ul>
          <div className="mt-6 text-sm ">©2022. Connectable.</div>
          <span className="text-xs ">
            <b>{BUISNESS.NAME}</b>
            <br />
            사업자등록번호: {BUISNESS.REFISTRATION_NUMBER}
            <br />
            대표 {BUISNESS.REPRESENTATIVE} | 주소: {BUISNESS.ADDRESS}
            <br />
            이메일 문의: {BUISNESS.EMAIL}
          </span>
        </div>
      </section>
    </footer>
  );
}
