import { Dialog, Transition } from '@headlessui/react';
import Image from 'next/image';
import { Fragment } from 'react';
import { useRecoilState } from 'recoil';

import { modalState, modalOepnState } from '~/recoils/modal';

export default function FullScreenModal() {
  const [modal, setModal] = useRecoilState(modalState);
  const [open, setOpen] = useRecoilState(modalOepnState);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 transition-opacity bg-white bg-opacity-70 backdrop-blur-[6px]" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="relative flex items-end justify-center min-h-screen p-4 text-center sm:items-center sm:p-0 w-[428px] m-auto">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div className="relative flex flex-col w-full h-screen px-4 py-3">
                <div className="absolute flex justify-between w-full t-0 py-[1.5rem]">
                  <div className="text-xl"> {modal?.modalName}</div>
                  <button
                    className="cursor-pointer h-[1.5rem]"
                    type="button"
                    onClick={() => {
                      setOpen(false);
                      setModal(null);
                    }}
                  >
                    <Image src="/images/x.svg" alt="cancle" width={24} height={24} />
                  </button>
                </div>
                <div className="my-auto ">{modal?.children}</div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
