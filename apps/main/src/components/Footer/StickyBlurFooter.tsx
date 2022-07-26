import { ReactNode } from 'react';

interface StickyBlurFooterProps {
  children: ReactNode;
  className?: string;
}
export default function StickyBlurFooter({ children, className = '' }: StickyBlurFooterProps) {
  return (
    <footer className={'sticky bottom-0 flex justify-between py-4 bg-transparent backdrop-blur-md ' + className}>
      {children}
    </footer>
  );
}
