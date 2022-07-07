import create from 'zustand';

interface ModalState {
  isOpen: boolean;
  setIsOpen: (_isOpen: boolean) => void;
  modalName: string | null;
  children: React.ReactNode;
  setModalContent: (modalName: string | null, children: React.ReactNode) => void;
  showModal: (modalName: string | null, children: React.ReactNode) => void;
  hideModal: () => void;
}

export const useModalStore = create<ModalState>(set => ({
  isOpen: false,
  setIsOpen: (_isOpen: boolean) => set(state => ({ ...state, isOpen: _isOpen })),
  modalName: null,
  children: null,
  setModalContent: (_modalName, _children) => set(state => ({ ...state, modalName: _modalName, children: _children })),

  showModal: (_modalName, _children) =>
    set(state => ({ ...state, isOpen: true, modalName: _modalName, children: _children })),
  hideModal: () => set(state => ({ ...state, modalName: null, children: null })),
}));
