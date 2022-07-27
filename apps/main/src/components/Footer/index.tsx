import Link from 'next/link';

import Text from '../Text';

const OFFICE_TERMS = [
  { name: '이용약관', href: '/terms-of-service' },
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
          <div className="mt-6 ">©2022. Connectable.</div>
        </div>
      </section>
    </footer>
  );
}
