import { useRecoilState, useSetRecoilState } from 'recoil';

import { FullScreenModalProps, modalOepnState, modalState } from '@recoils/modal';

export default function useModal() {
  const [modal, setModal] = useRecoilState(modalState);
  const setOpen = useSetRecoilState(modalOepnState);

  const showModal = ({ modalName, children }: FullScreenModalProps) => {
    setModal({ modalName, children });
    setOpen(true);
  };

  const hideModal = () => {
    setOpen(false);
    setModal(null);
  };

  return {
    modal,
    setModal,
    showModal,
    hideModal,
  };
}
