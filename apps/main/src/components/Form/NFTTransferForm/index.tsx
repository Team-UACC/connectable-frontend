import { ChangeEvent, useRef, useState } from 'react';

import Button from '~/components/Button';
import Input from '~/components/Input';
import KlipQR from '~/components/Klip/KlipQR';
import useTicketByIdsQuery from '~/hooks/apis/useTicketByIdsQuery';
import useKlip from '~/hooks/useKlip';
import { useModalStore } from '~/stores/modal';
import { useUserStore } from '~/stores/user';
import { isAdrress } from '~/utils/index';
import { getSafeTransferFromRequestKey } from '~/utils/klip';

import FormPageContainer from '../FormPageContainer';

interface Props {
  blockchain: 'Klaytn';
  eventId: number;
  ticketId: number;
}

export default function NFTTransferForm({ blockchain, eventId, ticketId }: Props) {
  const { klaytnAddress } = useUserStore();
  const { hideModal } = useModalStore();

  const [qrvalue, setQrvalue] = useState('DEFAULT');
  const [isEmpty, setIsEmpty] = useState(true);
  const [isAddress, setIsAddress] = useState(false);

  const { requestKlipTransaction } = useKlip({
    onSettled: () => {
      hideModal();
    },
  });

  const { data: ticketDetail } = useTicketByIdsQuery(Number(eventId), Number(ticketId));

  const transferToAddressInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setIsEmpty(value.length === 0);
    setIsAddress(isAdrress(value));
  };

  const handleSubmit = async () => {
    const requestKey = await getSafeTransferFromRequestKey({
      from: klaytnAddress,
      to: transferToAddressInputRef.current?.value as string,
      tokenId: ticketDetail?.tokenId as number,
      contractAddress: ticketDetail?.contractAddress as string,
    });

    requestKlipTransaction({ requestKey, setQrvalue });
  };

  if (qrvalue !== 'DEFAULT') {
    return <KlipQR qrvalue={qrvalue} />;
  }

  return (
    <div className="w-full overflow-hidden">
      <form
        className={`flex mt-[3rem] w-full bg-transparent `}
        onSubmit={e => {
          e.preventDefault();
        }}
      >
        <FormPageContainer>
          <Input
            name="transferToAddress"
            label="어디로 보낼까요?"
            notice={
              isAddress
                ? `아래 Klaytn 주소로 전송합니다.`
                : isEmpty
                ? `${ticketDetail?.eventName} NFT는 ${blockchain} 주소로만 보낼 수 있습니다.`
                : '주소가 올바르지 않습니다.'
            }
            type="text"
            placeholder="주소 입력해주세요"
            autoComplete="off"
            spellCheck="false"
            onChange={handleChange}
            ref={transferToAddressInputRef}
          />
          <Button onClick={handleSubmit} disabled={isAddress === false}>
            전송하기
          </Button>
        </FormPageContainer>
      </form>
    </div>
  );
}
