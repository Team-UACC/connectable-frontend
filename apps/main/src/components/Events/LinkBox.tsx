import Image from 'next/image';

import Tooltip from '../Tooltop';

interface Props {
  twitterUrl: string;
  instagramUrl: string;
  webpageUrl: string;
}

export default function LinkBox({ twitterUrl, instagramUrl, webpageUrl }: Props) {
  return (
    <div className="flex gap-4 ">
      <Tooltip message="트위터로 이동하기">
        <a href={twitterUrl} target="_blank" rel="noreferrer">
          <Image src="/images/twitter.svg" width={24} height={24} />
        </a>
      </Tooltip>
      <Tooltip message="인스타그램으로 이동하기">
        <a href={instagramUrl} target="_blank" rel="noreferrer">
          <Image src="/images/instagram.svg" width={24} height={24} />
        </a>
      </Tooltip>
      <Tooltip message="웹사이트로 이동하기">
        <a href={webpageUrl} target="_blank" rel="noreferrer">
          <Image src="/images/website.svg" width={24} height={24} />
        </a>
      </Tooltip>
    </div>
  );
}
