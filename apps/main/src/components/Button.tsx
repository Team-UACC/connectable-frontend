type ButtonColor = 'white' | 'blue';

const buttonColorTheme = {
  white: `text-blue bg-white border-[1px] border-gray-300 `,
  blue: `text-white  bg-blue`,
};

export default function Button({
  children,
  onClick,
  disabled,
  color = 'blue',
  py = 4,
}: {
  children: string;
  onClick?: () => void;
  disabled?: boolean;
  color?: ButtonColor;
  py?: number;
}) {
  return (
    <button
      className={` ${disabled && 'opacity-30'} py-[${py}px] ${
        buttonColorTheme[color]
      } gap-2 w-fit m-auto rounded-lg px-[16px]  font-bold  hover:shadow-red hover:drop-shadow-2xl focus:outline-none focus:shadow-outline`}
      type="button"
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
