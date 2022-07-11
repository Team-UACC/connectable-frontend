import Image from 'next/image';
import toast from 'react-hot-toast';

type ButtonColor = 'white' | 'brand' | 'red';

const buttonColorTheme = {
  white: `text-brand bg-white border-[1px] border-gray-300 `,
  brand: `text-white  bg-brand`,
  red: `text-white bg-red`,
};

export default function Button({
  children,
  onClick,
  disabled,
  color = 'brand',
}: {
  children: string;
  onClick?: () => void;
  disabled?: boolean;
  color?: ButtonColor;
}) {
  return (
    <button
      className={` ${disabled && 'opacity-30'} ${
        buttonColorTheme[color]
      } gap-2 w-fit m-auto rounded-lg px-5 py-2  font-bold shadow-sm hover:shadow-none hover:shadow-red hover:drop-shadow-xl focus:outline-none focus:shadow-outline`}
      type="button"
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export const TextCopyButton = ({ text, size = 24 }: { text: string; size?: number }) => (
  <button
    onClick={() => {
      navigator.clipboard.writeText(text);
      toast.success('클립보드에 복사되었습니다.');
    }}
  >
    <Image src="/images/duplicate.svg" alt="클립보드에 복사" width={size} height={size} />
  </button>
);
