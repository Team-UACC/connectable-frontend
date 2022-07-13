import { ReactNode } from 'react';

import Header from './Header';

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <div style={{ position: 'relative', width: 'min(428px, 100vw)', margin: 'auto' }}>
      <Header />
      <div className="flex flex-col items-center px-4">{children}</div>
    </div>
  );
}
