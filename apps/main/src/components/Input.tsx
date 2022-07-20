import { forwardRef, InputHTMLAttributes, Ref } from 'react';

import PageLabel from './PageLabel';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  notice?: string;
}

const Input = forwardRef(({ name, label, type, notice, ...rests }: Props, ref: Ref<HTMLInputElement>) => {
  return (
    <>
      <PageLabel text={label} htmlFor={name} />
      <span className=" absolute w-full text-xs text-red top-[1.5rem]">{notice}</span>
      <input
        className={`w-full px-3 py-3 font-semibold leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline`}
        id={name}
        type={type}
        ref={ref}
        {...rests}
      />
    </>
  );
});

export default Input;
