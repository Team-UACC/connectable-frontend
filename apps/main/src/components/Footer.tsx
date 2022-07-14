import Link from 'next/link';
import { ReactNode } from 'react';

const OFFICE_TERMS = ['이용약관', '개인정보처리방침'];
export default function Footer() {
  return (
    <footer className="w-full py-8 border-t-[1px] border-gray-300">
      <section>
        <div className="px-2 text-sm">
          <ul className="flex ">
            {OFFICE_TERMS.map(term => (
              <Link key={term} href={`/docs/${term}`}>
                <li className="mr-6 cursor-pointer">{term}</li>
              </Link>
            ))}
          </ul>
          <div className="mt-6 ">©2022. Connectable.</div>
        </div>
      </section>
    </footer>
  );
}

interface StickyBlurFooterProps {
  children: ReactNode;
}
export function StickyBlurFooter({ children }: StickyBlurFooterProps) {
  return (
    <footer className="sticky bottom-0 flex justify-between w-[calc(100%+32px)] py-4 -translate-x-4 bg-transparent backdrop-blur-md">
      {children}
    </footer>
  );
}
