import { Children, Dispatch, ReactNode, SetStateAction, useState } from 'react';

interface TabsProps {
  color: string;
  titles: Array<string>;
  children: ReactNode | Array<ReactNode>;
}

export default function Tabs({ color, titles, children }: TabsProps) {
  const [openTab, setOpenTab] = useState(0);
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full">
          <ul className="flex flex-row flex-wrap pt-3 pb-4 mb-0 list-none" role="tablist">
            {titles.map((title, idx) => (
              <TabNavButton key={title} color={color} openTab={openTab} setOpenTab={setOpenTab} idx={idx}>
                {title}
              </TabNavButton>
            ))}
          </ul>
          <div className="relative flex flex-col w-full min-w-0 mb-6 break-words bg-white rounded ">
            <div className="flex-auto px-2 py-2">
              <div className="tab-content tab-space">
                {Children.toArray(children).map((child, idx) => (
                  <div className={openTab === idx ? 'block' : 'hidden'} key={idx} id={`link${idx}`}>
                    {child}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

type TabNavButtonProps = {
  openTab: number;
  setOpenTab: Dispatch<SetStateAction<number>>;
  color: string;
  children: string;
  idx: number;
};

const TabNavButton = ({ openTab, setOpenTab, color, children, idx }: TabNavButtonProps) => {
  return (
    <li className="flex-auto mr-2 -mb-px text-center last:mr-0">
      <a
        className={
          'text-sm font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal ' +
          (openTab === idx ? 'text-white bg-' + color : 'text-' + color + ' bg-white')
        }
        onClick={e => {
          e.preventDefault();
          setOpenTab(idx);
        }}
        data-toggle="tab"
        href={`#link${idx}`}
        role="tablist"
      >
        {children}
      </a>
    </li>
  );
};
