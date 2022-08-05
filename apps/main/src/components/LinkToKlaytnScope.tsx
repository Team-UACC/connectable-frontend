import { ReactNode } from 'react';

import Tooltip from './Tooltop';

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
        {children}
      </a>
    </Tooltip>
  );
}
