import { Dialog, Transition } from '@headlessui/react';
import Image from 'next/image';
import { Fragment } from 'react';

import { useModalStore } from '~/stores/modal';
import { isShallowModalUrl } from '~/utils/index';

export default function FullScreenModal() {
  const { isOpen, modalName, children, setIsOpen, setModalContent } = useModalStore();

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
          <div className="fixed m-auto inset-0 transition-opacity bg-white bg-opacity-80 backdrop-blur-[6px]" />
        </Transition.Child>

        <div className="fixed w-[min(100vw,428px)] m-auto inset-0 z-10 ">
          <div className="relative flex items-end justify-center min-h-screen px-4 m-auto text-center">
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
                <div className="absolute flex justify-between w-full py-6 t-0">
                  <div className="text-xl font-bold"> {modalName}</div>
                  <button
                    className="cursor-pointer h-[1.5rem]"
                    type="button"
                    onClick={() => {
                      const storage = globalThis?.sessionStorage;
                      const current = storage.getItem('currentPath') || '/';

                      if (isShallowModalUrl(current)) {
                        window.history.back();
                        window.history.replaceState(window.history.state, '', window.location.pathname);
                      }

                      setIsOpen(false);
                      setModalContent(null, null);
                    }}
                  >
                    <Image src="/images/x.svg" alt="cancle" width={24} height={24} />
                  </button>
                </div>
                <div className="my-auto max-h-[80vh] overflow-y-scroll">{children}</div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
