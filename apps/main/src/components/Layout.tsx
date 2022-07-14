import { ReactNode } from 'react';

import Header from '~/components/Header';

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <div className="relative m-auto " style={{ width: 'min(428px, 100vw)', height: '100vh' }}>
      <Header />
      <div className="flex flex-col items-center px-4 ">{children}</div>
    </div>
  );
}
