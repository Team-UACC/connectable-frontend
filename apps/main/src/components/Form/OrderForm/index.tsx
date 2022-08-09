import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from 'react';

import Button from '~/components/Button';
import Input from '~/components/Input';
import Label from '~/components/Text/Label';
import useOrderForm from '~/hooks/useOrderForm';
import { useUserStore } from '~/stores/user';

import FormPageContainer from '../FormPageContainer';

import MoreDescription from './MoreDescription';

export type OrderFormPageType = 'OnBoarding' | 'Agreement' | 'UserInfo' | 'DepositCheck' | 'Finish';

interface Props {
  amount: number;
  ticketIdList: Array<number>;
  eventId: number;
}

export default function OrderForm({ amount, ticketIdList, eventId }: Props) {
  const { phoneNumber } = useUserStore();
  const [page, setPage] = useState<OrderFormPageType>('OnBoarding');

  const [isDisabledMoveToAgreemetnPage] = useState(false);
  const [isDisabledUserInfoPage, setIsDisabledUserInfoPage] = useState(true);
  const [isDisabledMoveToFinishPage, setIsDisabledMoveToFinishPage] = useState(false);

  const userNameRef = useRef<HTMLInputElement>(null);
  const phoneNumberRef = useRef<HTMLInputElement>(null);
  const depositCheckRef = useRef<HTMLInputElement>(null);

  const handleChangeTermsCheckBox = (e: ChangeEvent<HTMLInputElement>) => {
    setIsDisabledUserInfoPage(!e.currentTarget.checked ?? false);
  };

  const [handleKeyUpPhoneNumberInput, handleClickSubmitButton] = useOrderForm({
    userNameRef,
    phoneNumberRef,
    ticketIdList,
    eventId,
  });

  const handleChangeUserNameInput = (e: ChangeEvent<HTMLInputElement>) =>
    setIsDisabledMoveToFinishPage(e.currentTarget.value === '' || phoneNumberRef.current!.value.length < 13);

  const handleChangePhoneNumberInput = (e: ChangeEvent<HTMLInputElement>) =>
    setIsDisabledMoveToFinishPage(e.currentTarget.value.length < 13 || userNameRef.current?.value === '');

  const handleCheckEnter = (e: KeyboardEvent) => {
    if (e.key === 'Tab') {
      document.activeElement?.id !== 'username' && e.preventDefault();
    }
    if (e.key === 'Enter') {
      if (page === 'OnBoarding') !isDisabledMoveToAgreemetnPage && setPage('Agreement');
      else if (page === 'Agreement') !isDisabledUserInfoPage && setPage('UserInfo');
      else if (page === 'UserInfo') !isDisabledMoveToFinishPage && setPage('Finish');
    }
  };

  useEffect(() => {
    setTimeout(() => {
      if (page === 'UserInfo') {
        userNameRef.current?.focus();
        if (phoneNumberRef.current && phoneNumberRef.current?.value === '') {
          phoneNumberRef.current.value = phoneNumber;
        }
      }
      if (page === 'DepositCheck') depositCheckRef.current?.focus();
    }, 550);
  }, [page]);

  return (
    <div className="relative w-full h-full overflow-hidden">
      <form
        className={`flex ${page === 'Agreement' && '-translate-x-[25%]'}  
         ${page === 'UserInfo' && '-translate-x-[50%]'} ${
          page === 'Finish' && '-translate-x-[75%]'
        } w-[400%] bg-transparent rounded transition-all ease-in-out duration-[0.5s]`}
        onKeyDown={handleCheckEnter}
      >
        <FormPageContainer>
          <Label text={'주문 확인'} />
          <p className="font-semibold text-center">
            {`티켓 ${ticketIdList.length}장, 총 ${amount.toLocaleString('ko-KR')}원입니다.`}
            <br />
            <br />
            아래 버튼을 눌러 진행해주세요.
          </p>
          <Button onClick={() => setPage('Agreement')} disabled={isDisabledMoveToAgreemetnPage}>
            다음
          </Button>
        </FormPageContainer>
        <FormPageContainer>
          <label className="inline-flex items-center text-sm font-semibold">
            <input
              type="checkbox"
              className="w-4 h-4 mr-2 text-indigo-600 form-checkbox"
              onChange={handleChangeTermsCheckBox}
            />
            <span className="text-blue-500 cursor-pointer">{`[필수] 개인정보 수집동의`}</span>
          </label>
          <MoreDescription page="Agreement" amount={amount} />

          <br />

          <div className="flex justify-around w-2/3 m-auto ">
            <Button onClick={() => setPage('OnBoarding')} disabled={false}>
              이전
            </Button>
            <Button onClick={() => setPage('UserInfo')} disabled={isDisabledUserInfoPage}>
              다음
            </Button>
          </div>
        </FormPageContainer>
        <FormPageContainer>
          <Input
            name="username"
            label="예매자 성함"
            type="text"
            placeholder="이름을 입력해주세요"
            onChange={handleChangeUserNameInput}
            autoComplete="off"
            spellCheck={false}
            ref={userNameRef}
          />
          <MoreDescription page="UserName" amount={amount} />

          <br />
          <Input
            name="phonenumber"
            label="전화번호"
            type="tel"
            placeholder="전화번호를 입력해주세요"
            maxLength={13}
            onKeyUp={handleKeyUpPhoneNumberInput}
            onChange={handleChangePhoneNumberInput}
            autoComplete="off"
            spellCheck={false}
            ref={phoneNumberRef}
          />
          <MoreDescription page="PhoneNumber" amount={amount} />

          <div className="flex justify-around w-2/3 m-auto ">
            <Button onClick={() => setPage('Agreement')} disabled={false}>
              이전
            </Button>
            <Button onClick={() => setPage('Finish')} disabled={isDisabledMoveToFinishPage}>
              다음
            </Button>
          </div>
        </FormPageContainer>

        <FormPageContainer>
          <Label text="예매 폼 작성이 완료되었습니다." />
          <MoreDescription page="DepositCheck" amount={amount} />

          <Button onClick={() => setPage('UserInfo')} disabled={false}>
            이전
          </Button>
          <Button color="red" onClick={handleClickSubmitButton} disabled={false}>
            예매 폼 제출하기
          </Button>
          <MoreDescription page="Finish" amount={amount} />
        </FormPageContainer>
      </form>
    </div>
  );
}
