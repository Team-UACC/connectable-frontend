import { ReactNode } from 'react';

import { Block } from './Block';
import Header from './Header';

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <div style={{ position: 'relative', width: 'min(428px, 100vw)', margin: 'auto' }}>
      <Header />
      <Block />
      <div className="flex flex-col items-center px-6">{children}</div>
    </div>
  );
}
