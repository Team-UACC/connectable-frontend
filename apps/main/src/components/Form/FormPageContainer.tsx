import { ReactNode } from 'react';

const FormPageContainer = ({ children }: { children: ReactNode }) => (
  <div className="relative w-full max-w-[18rem] h-[60vh] m-auto flex ">
    <div className=" absolute w-full top-1/2 -translate-y-1/2 flex flex-col gap-[1rem]">{children}</div>
  </div>
);

export default FormPageContainer;
