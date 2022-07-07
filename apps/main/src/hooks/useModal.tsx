import { useModalStore } from '~/stores/modal';

type ModalProps = {
  modalName: string;
  children: React.ReactNode;
};

export default function useModal() {
  const { setIsOpen, setModalContent } = useModalStore();

  const showModal = ({ modalName, children }: ModalProps) => {
    setModalContent(modalName, children);
    setIsOpen(true);
  };

  const hideModal = () => {
    setIsOpen(false);
    setModalContent(null, null);
  };

  return {
    showModal,
    hideModal,
  };
}
