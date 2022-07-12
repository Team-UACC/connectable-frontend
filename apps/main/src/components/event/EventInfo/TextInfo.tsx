import { TextCopyButton } from '~/components/Button';

interface TextInfoProps {
  title: string;
  contents: Array<{ header: string; info: string; hasCopy?: boolean }>;
}

export default function TextInfo({ title, contents }: TextInfoProps) {
  return (
    <div className="w-full p-4">
      <h2 className="text-xl font-bold">{title}</h2>
      {contents.map(({ header, info, hasCopy = false }) => (
        <div key={header} className="flex w-full mt-4">
          <h3 className=" w-[40%] font-semibold ">{header}</h3>
          {hasCopy ? (
            <div className="w-[60%] flex text-sm ">
              <span className="overflow-hidden text-ellipsis">{info}</span>
              <TextCopyButton size={24} text={info} />
            </div>
          ) : (
            <span className="text-sm ">{info}</span>
          )}
        </div>
      ))}
    </div>
  );
}
