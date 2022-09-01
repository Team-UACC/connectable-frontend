// eslint-disable-next-line import/no-named-as-default
import toast from 'react-hot-toast';

import { useModalStore } from '~/stores/modal';
import { useUserStore } from '~/stores/user';

import QREntranceForm from '../Form/QREntranceForm';
import LoginRequestToast from '../Toast/LoginRequestToast';

import Button from '.';

interface Props {
  ticketId: number;
}

export default function QREntranceButton({ ticketId }: Props) {
  const { showModal } = useModalStore();
  const { isLoggedIn } = useUserStore();
  return (
    <Button
      onClick={() => {
        if (!isLoggedIn) {
          toast.error(<LoginRequestToast />);
        } else {
          showModal('QR 입장', <QREntranceForm ticketId={ticketId} />);
        }
      }}
      color="red"
    >
      QR 입장
    </Button>
  );
}
