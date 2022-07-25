import caver from 'caver-js';
import { ChangeEvent, KeyboardEvent, useRef, useState } from 'react';

import Button from '~/components/Button';
import Input from '~/components/Input';

import FormPageContainer from '../FormPageContainer';

interface Props {
  blockchain: 'Klaytn';
  eventName: string;
}

export default function NFTTransferForm({ blockchain, eventName }: Props) {
  const [isEmpty, setIsEmpty] = useState(true);
  const [isAddress, setIsAddress] = useState(false);

  const transferToAddressInputRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') console.log('submit');
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setIsEmpty(value.length === 0);
    setIsAddress(caver.utils.isAddress(value));
  };

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
                ? `${eventName} NFT는 ${blockchain} 주소로만 보낼 수 있습니다.`
                : '주소가 올바르지 않습니다.'
            }
            type="text"
            placeholder="주소 입력해주세요"
            autoComplete="off"
            spellCheck="false"
            onChange={handleChange}
            ref={transferToAddressInputRef}
          />
          <Button onClick={() => {}} disabled={isAddress === false}>
            전송하기
          </Button>
        </FormPageContainer>
      </form>
    </div>
  );
}
