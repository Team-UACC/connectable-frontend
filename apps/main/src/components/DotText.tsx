import { ReactNode } from 'react';

export default function DotText({ children }: { children: ReactNode }) {
  return (
    <div className="flex ">
      <div className="mr-2">· </div> <div>{children}</div>
    </div>
  );
}
