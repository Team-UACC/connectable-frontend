import { ReactNode } from 'react';

const MoreDescriptionContainer = ({ children }: { children: ReactNode }) => (
  <div className="absolute top-[12rem] w-full -translate-x-1/2 left-1/2">{children}</div>
);

export default MoreDescriptionContainer;
