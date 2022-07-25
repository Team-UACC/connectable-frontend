import axios from 'axios';
import QRCode from 'qrcode.react';
import { ChangeEvent, KeyboardEvent, useRef, useState } from 'react';
import toast from 'react-hot-toast';

import Button from '~/components/Button';
import Input from '~/components/Input';
import useTicketByIdsQuery from '~/hooks/apis/useTicketByIdsQuery';
import { useModalStore } from '~/stores/modal';
import { useUserStore } from '~/stores/user';
import { getKlipAccessMethod, getKlipRequest, getSafeTransferFromRequestKey } from '~/utils/klip';

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

  const { data: ticketDetail } = useTicketByIdsQuery(Number(eventId), Number(ticketId));

  const transferToAddressInputRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') console.log('submit');
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setIsEmpty(value.length === 0);
    setIsAddress(/^(0x)?[0-9a-f]{40}$/i.test(value));
  };

  if (qrvalue !== 'DEFAULT') {
    return (
      <div>
        <QRCode value={qrvalue} size={256} style={{ margin: 'auto' }} />
        <br />
        <br />
        <span className="font-bold ">휴대폰으로 스캔하여 Klip으로 진행해 주세요.</span>
      </div>
    );
  }

  return (
    <div className="w-full overflow-hidden">
      <form onKeyDown={handleKeyDown} className={`flex mt-[3rem] w-full bg-transparent `}>
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
          <Button
            onClick={async () => {
              const method = getKlipAccessMethod();

              const requestKey = await getSafeTransferFromRequestKey({
                from: klaytnAddress,
                to: transferToAddressInputRef.current?.value as string,
                tokenId: ticketDetail?.tokenId as number,
                contractAddress: 'ticketDetail?.contractAddress as string',
              });

              getKlipRequest(requestKey, method, setQrvalue);

              const timerId = setInterval(() => {
                axios.get(`https://a2a-api.klipwallet.com/v2/a2a/result?request_key=${requestKey}`).then(res => {
                  const { status } = res.data;

                  if (status === 'completed') {
                    const { tx_hash } = res.data.result;
                    toast.success(`전송에 성공하였습니다. TX_hash : ${tx_hash}`);
                    clearInterval(timerId);
                    hideModal();
                  }
                  if (status === 'fail' || status === 'error') {
                    toast.error('트랜잭션에 실패했습니다.');
                    clearInterval(timerId);
                    hideModal();
                  }
                });
              }, 1000);
            }}
            disabled={isAddress === false}
          >
            전송하기
          </Button>
        </FormPageContainer>
      </form>
    </div>
  );
}
