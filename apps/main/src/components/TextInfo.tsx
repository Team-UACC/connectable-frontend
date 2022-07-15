import { ReactNode } from 'react';

import { TextCopyButton } from '~/components/Button';

type Contents = { term: string; description: string; hasCopy?: boolean };

interface Props {
  title: string;
  contents: Array<Contents>;
}

export default function TextInfo({ title, contents }: Props) {
  return (
    <div className="w-full p-4">
      <h2 className="text-xl font-bold">{title}</h2>
      {contents.map(({ term, description, hasCopy = false }) => (
        <TextInfoLine key={term} term={term} description={description} hasCopy={hasCopy} />
      ))}
    </div>
  );
}

export function TextInfoLine({ term, description, hasCopy }: Contents) {
  return (
    <div key={term} className="flex w-full mt-4">
      <h3 className=" w-[40%] font-semibold ">{term}</h3>
      {hasCopy ? (
        <div className="w-[60%] flex text-sm ">
          <span className="overflow-hidden text-ellipsis">{description}</span>
          <TextCopyButton size={32} text={description} />
        </div>
      ) : (
        <span className="w-[60%] text-sm ">{description}</span>
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
        <span className="text-sm leading-4">{children}</span>
      </div>
    </div>
  );
}
