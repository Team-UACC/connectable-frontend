import Image from 'next/image';
import { ReactNode } from 'react';

import Text from './Text';
import Tooltip from './Tooltip';

interface Props {
  tx_hash?: string;
  account?: string;
  type: 'tx' | 'account';
  children: ReactNode;
}

export default function LinkToKlaytnScope({ tx_hash, account, children, type }: Props) {
  return (
    <Tooltip message="KlaytnScope에서 확인하기">
      <a
        href={`https://scope.klaytn.com/${type}/${type === 'tx' ? tx_hash : account}`}
        target="_blank"
        rel="noreferrer"
        className="w-full "
      >
        <div className="flex">
          <div className="flex flex-1 min-w-0 ">
            <Text textEllipsis={true}>{children}</Text>
          </div>
          <Image
            src="/images/external-link.svg"
            alt="tx-hash"
            width={18}
            height={18}
            className="flex-shrink-0 -translate-y-[2px]"
          />
        </div>
      </a>
    </Tooltip>
  );
}
