import { ReactNode } from 'react';

interface Props {
  message: string;
  children: ReactNode;
}

export default function Tooltip({ message, children }: Props) {
  return (
    <div className="relative flex flex-col items-center w-full group">
      {children}
      <div className="absolute flex-col items-center hidden mb-6 bottom-2 w-max group-hover:flex">
        <span className="relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-gray-600 rounded-md shadow-lg">
          {message}
        </span>
        <div className="w-3 h-3 -mt-2 rotate-45 bg-gray-600"></div>
      </div>
    </div>
  );
}
