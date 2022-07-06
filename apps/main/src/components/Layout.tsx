import { ReactNode } from 'react';

import Header from './Header';

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <div style={{ position: 'relative', width: 'min(428px, 100vw)', margin: 'auto' }}>
      <Header />
      {children}
    </div>
  );
}
