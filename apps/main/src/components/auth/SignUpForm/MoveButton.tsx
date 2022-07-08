export default function MoveButton({
  text,
  onClick,
  disabled,
}: {
  text: string;
  onClick: () => void;
  disabled: boolean;
}) {
  return (
    <button
      className={` ${
        disabled && 'opacity-30'
      }  gap-2 w-fit m-auto rounded-lg px-[16px] py-[8px] font-bold text-white bg-blue hover:shadow-red hover:drop-shadow-2xl focus:outline-none focus:shadow-outline`}
      type="button"
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
}
