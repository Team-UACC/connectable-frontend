import { Dispatch, SetStateAction, useState } from 'react';

type TabsProps = { color: string; titles: Array<string> };

export default function Tabs({ color, titles }: TabsProps) {
  const [openTab, setOpenTab] = useState(1);
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full">
          <ul className="flex flex-row flex-wrap pt-3 pb-4 mb-0 list-none" role="tablist">
            {titles.map((title, idx) => (
              <TabNavButton key={title} color={color} openTab={openTab} setOpenTab={setOpenTab} idx={idx + 1}>
                {title}
              </TabNavButton>
            ))}
          </ul>
          <div className="relative flex flex-col w-full min-w-0 mb-6 break-words bg-white rounded ">
            <div className="flex-auto px-2 py-5">
              <div className="tab-content tab-space">
                <div className={openTab === 1 ? 'block' : 'hidden'} id="link1">
                  <p>Ticket</p>
                </div>
                <div className={openTab === 2 ? 'block' : 'hidden'} id="link2">
                  <p>Transaction</p>
                </div>
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
        href="#link1"
        role="tablist"
      >
        {children}
      </a>
    </li>
  );
};
