import Image from 'next/image';
import { forwardRef, MouseEvent, ReactNode, Ref } from 'react';
// eslint-disable-next-line import/no-named-as-default
import toast from 'react-hot-toast';

import Tooltip from '../Tooltip';

type ButtonColor = 'white' | 'brand' | 'red' | 'kakao';

enum buttonColorTheme {
  white = `text-brand bg-white border-[1px] border-gray-300 `,
  brand = `text-white  bg-brand`,
  red = `text-white bg-red`,
  kakao = `text-black bg-[#FEE500] `,
}

export interface ButtonProps {
  children: ReactNode;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  color?: ButtonColor;
  className?: string;
}

export default forwardRef(function Button(
  { children, onClick, disabled, color = 'brand', className = '' }: ButtonProps,
  ref: Ref<HTMLButtonElement>
) {
  return (
    <button
      className={`${disabled && 'opacity-30'} ${
        buttonColorTheme[color]
      } gap-2 w-fit m-auto rounded-lg px-5 py-2  font-bold shadow-sm focus:drop-shadow-xl hover:drop-shadow-xl focus:outline-none focus:shadow-outline ${className} `}
      type="button"
      onClick={onClick}
      disabled={disabled}
      ref={ref}
    >
      {children}
    </button>
  );
});

export const TextCopyButton = ({ text, size = 24 }: { text: string; size?: number }) => (
  <Tooltip message="복사하기">
    <button
      onClick={() => {
        navigator.clipboard.writeText(text);
        toast.success('클립보드에 복사되었습니다.');
      }}
    >
      <Image src="/images/duplicate.svg" alt="클립보드에 복사" width={size} height={size} />
    </button>
  </Tooltip>
);
