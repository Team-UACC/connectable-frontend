import { ReactNode } from 'react';

import { TextCopyButton } from '~/components/Button';

type Contents = { header: string; info: string; hasCopy?: boolean };

interface Props {
  title: string;
  contents: Array<Contents>;
}

export default function TextInfo({ title, contents }: Props) {
  return (
    <div className="w-full p-4">
      <h2 className="text-xl font-bold">{title}</h2>
      {contents.map(({ header, info, hasCopy = false }) => (
        <TextInfoLine key={header} header={header} info={info} hasCopy={hasCopy} />
      ))}
    </div>
  );
}

export function TextInfoLine({ header, info, hasCopy }: Contents) {
  return (
    <div key={header} className="flex w-full mt-4">
      <h3 className=" w-[40%] font-semibold ">{header}</h3>
      {hasCopy ? (
        <div className="w-[60%] flex text-sm ">
          <span className="overflow-hidden text-ellipsis">{info}</span>
          <TextCopyButton size={32} text={info} />
        </div>
      ) : (
        <span className="text-sm ">{info}</span>
      )}
    </div>
  );
}

interface TextInfoSimpleProps {
  title: string;
  children: ReactNode;
}

export function TextInfoSimple({ title, children }: TextInfoSimpleProps) {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">{title}</h2>
      <div className="mt-4">
        <span className="text-sm leading-4 break-words">{children}</span>
      </div>
    </div>
  );
}
