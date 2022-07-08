type ButtonColor = 'white' | 'brand';

const buttonColorTheme = {
  white: `text-brand bg-white border-[1px] border-gray-300 `,
  brand: `text-white  bg-brand`,
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
