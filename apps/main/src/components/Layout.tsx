import { ReactNode } from 'react';

import Header from './Header';

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <div style={{ width: '428px', margin: 'auto' }}>
      <Header />
      {children}
    </div>
  );
}
