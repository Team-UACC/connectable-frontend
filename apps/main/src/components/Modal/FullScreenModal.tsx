import { Dialog, Transition } from '@headlessui/react';
import Image from 'next/image';
import { Fragment } from 'react';

import { useModal } from '~/stores/modal';

export default function FullScreenModal() {
  const { isOpen, modalName, children, setIsOpen, setModalContent } = useModal();

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setIsOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed m-auto inset-0 transition-opacity bg-white bg-opacity-70 backdrop-blur-[6px]" />
        </Transition.Child>

        <div className="fixed w-[min(100vw,428px)] m-auto inset-0 z-10 overflow-y-hidden">
          <div className="relative flex items-end justify-center min-h-screen p-4 m-auto text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div className="relative flex flex-col w-full h-screen">
                <div className="absolute flex justify-between w-full t-0 py-[1.5rem]">
                  <div className="text-xl"> {modalName}</div>
                  <button
                    className="cursor-pointer h-[1.5rem]"
                    type="button"
                    onClick={() => {
                      setIsOpen(false);
                      setModalContent(null, null);
                    }}
                  >
                    <Image src="/images/x.svg" alt="cancle" width={24} height={24} />
                  </button>
                </div>
                <div className="my-auto ">{children}</div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
