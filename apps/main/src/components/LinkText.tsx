import Image from 'next/image';
import { ReactNode } from 'react';

import Text from './Text';

interface Props {
  href: string;
  children: ReactNode;
}
export default function LinkText({ href, children }: Props) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className="w-full ">
      <div className="flex">
        <div className="flex flex-1 min-w-0 ">
          <Text className="underline ">{children}</Text>
        </div>
        <Image
          src="/images/external-link.svg"
          alt="tx-hash"
          width={18}
          height={18}
          className="flex-shrink-0 -translate-y-[2px] "
        />
      </div>
    </a>
  );
}
