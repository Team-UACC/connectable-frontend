import create from 'zustand';

interface ModalState {
  isOpen: boolean;
  setIsOpen: (_isOpen: boolean) => void;
  modalName: string | null;
  children: React.ReactNode;
  setModalContent: (modalName: string | null, children: React.ReactNode) => void;
}

export const useModalStore = create<ModalState>(set => ({
  isOpen: false,
  setIsOpen: (_isOpen: boolean) => set(state => ({ ...state, isOpen: _isOpen })),
  modalName: null,
  children: null,
  setModalContent: (_modalName, _children) => set(state => ({ ...state, modalName: _modalName, children: _children })),
}));
