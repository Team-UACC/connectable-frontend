import Image from 'next/image';
import Link from 'next/link';
import { MouseEvent } from 'react';

interface Props {
  src: string;
  alt: string;
  href?: string;
  width?: number;
  height?: number;
  onClick?: (e: MouseEvent) => void;
}

export default function NavIcons({ src, alt, href, width = 24, height = 24, onClick }: Props) {
  if (!href)
    return (
      <button
        onClick={onClick}
        className="flex flex-col justify-center transition-all ease-in-out rounded-full cursor-pointer hover:scale-125 focus:scale-125 "
      >
        <Image src={src} alt={alt} width={width} height={height} className="p-6" />
      </button>
    );
  else
    return (
      <Link href={href}>
        <a className="flex flex-col justify-center transition-all ease-in-out rounded-full cursor-pointer hover:scale-125 focus:scale-125 ">
          <Image src={src} alt={alt} width={width} height={height} className="rounded-full" />
        </a>
      </Link>
    );
}
