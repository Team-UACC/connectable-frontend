import { ReactNode } from 'react';

const FormPageContainer = ({ children }: { children: ReactNode }) => (
  <div className="relative w-full max-w-[18rem] h-[80vh] m-auto flex flex-col justify-center ">
    <div className="releative w-full h-max flex flex-col gap-[1rem]">{children}</div>
  </div>
);

export default FormPageContainer;
