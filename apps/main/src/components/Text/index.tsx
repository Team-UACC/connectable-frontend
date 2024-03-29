import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl';
  className?: string;
  textEllipsis?: boolean;
  weight?: 'normal' | 'semibold' | 'bold';
}

export default function Text({
  children,
  size = 'sm',
  weight = 'normal',
  className = '',
  textEllipsis = false,
}: Props) {
  return (
    <span
      className={
        `text-${size} font-${weight} leading-6 ` +
        className +
        (textEllipsis ? ' overflow-hidden text-ellipsis whitespace-nowrap' : ' ')
      }
    >
      {children}
    </span>
  );
}
