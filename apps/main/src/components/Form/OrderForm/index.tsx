import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from 'react';

import Button from '~/components/Button';
import Input from '~/components/Input';
import Label from '~/components/Text/Label';
import useOrderForm from '~/hooks/useOrderForm';
import { event } from '~/libs/gtag';

import FormPageContainer from '../FormPageContainer';

import MoreDescription from './MoreDescription';

export type OrderFormPageType = 'OnBoarding' | 'Agreement' | 'UserInfo' | 'DepositCheck' | 'Finish';

interface Props {
  amount: number;
  ticketIdList: Array<number>;
  eventId: number;
}

export default function OrderForm({ amount, ticketIdList, eventId }: Props) {
  const [page, setPage] = useState<OrderFormPageType>('OnBoarding');
  const [isDisabledMoveToAgreemetnPage] = useState(false);
  const [isDisabledUserInfoPage, setIsDisabledUserInfoPage] = useState(true);
  const [isDisabledMoveToFinishPage, setIsDisabledMoveToFinishPage] = useState(true);
  const [isDisabledSubmit, setIsDisabledSubmit] = useState(true);

  const userNameRef = useRef<HTMLInputElement>(null);
  const depositCheckRef = useRef<HTMLInputElement>(null);

  const isSubmitRef = useRef(false);

  const handleChangeTermsCheckBox = (e: ChangeEvent<HTMLInputElement>) => {
    setIsDisabledUserInfoPage(!e.currentTarget.checked ?? false);
  };

  const handleChangeSubmitTerms = (e: ChangeEvent<HTMLInputElement>) => {
    setIsDisabledSubmit(!e.currentTarget.checked ?? false);
  };

  const [handleClickSubmitButton] = useOrderForm({
    userNameRef,
    ticketIdList,
    eventId,
  });

  const handleChangeUserNameInput = (e: ChangeEvent<HTMLInputElement>) =>
    setIsDisabledMoveToFinishPage(e.currentTarget.value === '');

  const handleCheckEnter = (e: KeyboardEvent) => {
    if (e.key === 'Tab') {
      document.activeElement?.id !== 'username' && e.preventDefault();
    }
    if (e.key === 'Enter') {
      e.preventDefault();
      if (page === 'OnBoarding') !isDisabledMoveToAgreemetnPage && setPage('Agreement');
      else if (page === 'Agreement') !isDisabledUserInfoPage && setPage('UserInfo');
      else if (page === 'UserInfo') !isDisabledMoveToFinishPage && setPage('Finish');
    }
  };

  useEffect(() => {
    setTimeout(() => {
      if (page === 'UserInfo') {
        userNameRef.current?.focus();
      }
      if (page === 'DepositCheck') depositCheckRef.current?.focus();
    }, 550);
  }, [page]);

  useEffect(() => {
    event({
      action: 'try_order',
      category: 'ecommerce',
      label: `event_id: ${eventId}, ticketIdList: ${JSON.stringify(ticketIdList)}`,
      value: 1,
    });
    return () => {
      event({
        action: 'checkout_order',
        category: 'ecommerce',
        label: `is_submit_form: ${isSubmitRef}, event_id: ${eventId}, ticketIdList: ${JSON.stringify(ticketIdList)}`,
        value: 1,
      });
    };
  }, []);

  return (
    <div className="relative w-full h-full overflow-x-hidden">
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
          <label className="inline-flex items-center m-auto text-sm font-semibold">
            <input
              type="checkbox"
              className="w-4 h-4 mr-2 text-indigo-600 form-checkbox"
              onChange={handleChangeSubmitTerms}
            />
            <span className="text-blue-500 cursor-pointer ">{`[필수] 위 내용을 확인했습니다.`}</span>
          </label>

          <Button onClick={() => setPage('UserInfo')} disabled={false}>
            이전
          </Button>
          <Button
            color="red"
            onClick={e => {
              handleClickSubmitButton(e);
              isSubmitRef.current = true;
            }}
            disabled={isDisabledSubmit}
          >
            예매 폼 제출하기
          </Button>
          <MoreDescription page="Finish" amount={amount} />
        </FormPageContainer>
      </form>
    </div>
  );
}
