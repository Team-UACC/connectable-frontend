import Image from 'next/image';

interface LinkBoxProps {
  twitterUrl: string;
  instagramUrl: string;
  webpageUrl: string;
}

export default function LinkBox({ twitterUrl, instagramUrl, webpageUrl }: LinkBoxProps) {
  return (
    <div className="flex ">
      <a href={twitterUrl} target="_blank" rel="noreferrer">
        <Image src="/images/twitter.svg" width={24} height={24} />
      </a>
      <div className=" min-w-[16px]" />
      <a href={instagramUrl} target="_blank" rel="noreferrer">
        <Image src="/images/instagram.svg" width={24} height={24} />
      </a>
      <div className=" min-w-[16px]" />
      <a href={webpageUrl} target="_blank" rel="noreferrer">
        <Image src="/images/website.svg" width={24} height={24} />
      </a>
    </div>
  );
}
