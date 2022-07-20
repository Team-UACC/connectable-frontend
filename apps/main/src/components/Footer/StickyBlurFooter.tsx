import { ReactNode } from 'react';

interface StickyBlurFooterProps {
  children: ReactNode;
}
export default function StickyBlurFooter({ children }: StickyBlurFooterProps) {
  return (
    <footer className="sticky bottom-0 flex justify-between w-[calc(100%+32px)] py-4 bg-transparent backdrop-blur-md">
      {children}
    </footer>
  );
}
