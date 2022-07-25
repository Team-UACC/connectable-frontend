// eslint-disable-next-line import/no-named-as-default
import toast from 'react-hot-toast';

import NFTTransferForm from '~/components/Form/NFTTransferForm';
import { useModalStore } from '~/stores/modal';
import { useUserStore } from '~/stores/user';

import Button, { ButtonProps } from '..';

interface Props extends Omit<ButtonProps, 'children'> {
  blockchain?: 'Klaytn';
  eventName: string;
}

export default function NFTTransferButton({ blockchain = 'Klaytn', eventName }: Props) {
  const { isLoggedIn } = useUserStore();
  const { showModal } = useModalStore();

  return (
    <Button
      onClick={() => {
        if (!isLoggedIn) {
          toast.error('로그인 후 이용해주세요.');
        } else {
          showModal('NFT 전송하기', <NFTTransferForm blockchain={blockchain} eventName={eventName} />);
        }
      }}
    >
      NFT 전송하기
    </Button>
  );
}
