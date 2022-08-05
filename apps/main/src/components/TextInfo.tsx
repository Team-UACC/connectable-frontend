import { ReactNode } from 'react';

import Button from '~/components/Button';

import Text from './Text';

type Contents = { term: string; description: ReactNode; hasCopy?: boolean };

interface Props {
  title: string;
  contents: Array<Contents>;
}

export default function TextInfo({ title, contents }: Props) {
  return (
    <div className="w-full px-2 py-4">
      <h2 className="text-xl font-bold">{title}</h2>
      {contents.map(({ term, description, hasCopy = false }) => (
        <TextInfo.Line key={term} term={term} description={description} hasCopy={hasCopy} />
      ))}
    </div>
  );
}

TextInfo.Line = ({ term, description, hasCopy }: Contents) => {
  if (!description)
    return (
      <div key={term} className="flex w-full mt-4">
        <h3 className=" w-[40%] font-semibold ">{term}</h3>
        <Text className="w-[60%]"> -</Text>
      </div>
    );

  return (
    <div key={term} className="flex w-full mt-4">
      <h3 className=" w-[40%] font-semibold ">{term}</h3>
      {hasCopy ? (
        <div className="w-[60%] flex ">
          <Text textEllipsis={true}>{description}</Text>
          <div className="flex-shrink-0 w-6 ">
            <Button.TextCopy size={18} text={description as string} />
          </div>
        </div>
      ) : (
        <Text className="w-[60%]">{description}</Text>
      )}
    </div>
  );
};

interface TextInfoSimpleProps {
  title: string;
  children: ReactNode;
}

TextInfo.Simple = ({ title, children }: TextInfoSimpleProps) => {
  return (
    <div className="px-2 py-4">
      <h2 className="text-xl font-bold">{title}</h2>
      <div className="mt-4">
        <Text> {children}</Text>
      </div>
    </div>
  );
};
