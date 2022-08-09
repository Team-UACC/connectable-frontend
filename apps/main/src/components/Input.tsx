import { forwardRef, InputHTMLAttributes, Ref } from 'react';

import Label from './Text/Label';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  notice?: string;
}

const Input = forwardRef(({ name, label, type, notice, ...rests }: Props, ref: Ref<HTMLInputElement>) => {
  return (
    <div className="relative flex flex-col gap-4">
      <Label text={label} htmlFor={name} />
      <span className=" absolute w-full text-xs text-red top-[1.75rem]">{notice}</span>
      <input
        className={`w-full px-3 py-3 font-semibold leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline`}
        id={name}
        type={type}
        ref={ref}
        {...rests}
      />
    </div>
  );
});

export default Input;
