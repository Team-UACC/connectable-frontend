// eslint-disable-next-line import/no-named-as-default
import toast from 'react-hot-toast';

import NFTTransferForm from '~/components/Form/NFTTransferForm';
import { useModalStore } from '~/stores/modal';
import { useUserStore } from '~/stores/user';

import Button, { ButtonProps } from '..';

interface Props extends Omit<ButtonProps, 'children'> {
  blockchain?: 'Klaytn';
  eventId: number;
  ticketId: number;
}

export default function NFTTransferButton({ blockchain = 'Klaytn', eventId, ticketId }: Props) {
  const { isLoggedIn } = useUserStore();
  const { showModal } = useModalStore();

  return (
    <Button
      onClick={() => {
        if (!isLoggedIn) {
          toast.error('로그인 후 이용해주세요.');
        } else {
          showModal(
            'NFT 전송하기',
            <NFTTransferForm blockchain={blockchain} eventId={Number(eventId)} ticketId={Number(ticketId)} />
          );
        }
      }}
    >
      NFT 전송하기
    </Button>
  );
}
