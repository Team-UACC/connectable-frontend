import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from 'react';

import Button from '~/components/Button';
import Input from '~/components/Input';
import Label from '~/components/Label';
import useOrderForm from '~/hooks/useOrderForm';
import { useUserStore } from '~/stores/user';

import FormPageContainer from '../FormPageContainer';
import MoreDescriptionContainer from '../MoreDescriptionContainer';

import MoreDescription from './MoreDescription';

export type OrderFormPageType = 'UserName' | 'PhoneNumber' | 'Agreement' | 'NumberOfPeople' | 'DepositCheck' | 'Finish';

interface Props {
  amount: number;
  numberLimit: number;
}

export default function OrderForm({ amount, numberLimit }: Props) {
  const { phoneNumber } = useUserStore();
  const [page, setPage] = useState<OrderFormPageType>('UserName');

  const [isDisabledMoveToPhoneNumberPage, setIsDisabledMoveToPhoneNumberPage] = useState(true);
  const [isDisabledMoveToAgreemetnPage, setIsDisabledMoveToAgreemetnPage] = useState(true);
  const [isDisabledMoveToNumberOfPeoplePage, setIsDisabledMoveToNumberOfPeoplePage] = useState(true);
  const [isDisabledMoveToDepositCheckPage, setIsDisabledMoveToDepositCheckPage] = useState(true);
  const [isDisabledMoveToFinishPage, setIsDisabledMoveToFinishPage] = useState(true);

  const [numberOfPeople, setNumberOfPeople] = useState(1);

  const userNameRef = useRef<HTMLInputElement>(null);
  const phoneNumberRef = useRef<HTMLInputElement>(null);
  const agreementRef = useRef<HTMLInputElement>(null);
  const numberOfPeopleRef = useRef<HTMLInputElement>(null);
  const depositCheckRef = useRef<HTMLInputElement>(null);

  const [handleKeyUpPhoneNumberInput, handleClickSubmitButton] = useOrderForm({
    userNameRef,
    phoneNumberRef,
    agreementRef,
    numberOfPeopleRef,
    depositCheckRef,
  });

  const handleChangeUserNameInput = (e: ChangeEvent<HTMLInputElement>) =>
    setIsDisabledMoveToPhoneNumberPage(e.currentTarget.value === '');

  const handleChangePhoneNumberInput = (e: ChangeEvent<HTMLInputElement>) =>
    setIsDisabledMoveToAgreemetnPage(e.currentTarget.value.length < 13);

  const handleChangeAgreementInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.value === '동의') {
      setIsDisabledMoveToNumberOfPeoplePage(false);
    } else {
      setIsDisabledMoveToNumberOfPeoplePage(true);
    }
  };

  const handleChangeNumberOfPeopleInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (1 <= Number(e.currentTarget.value) && Number(e.currentTarget.value) <= numberLimit) {
      setNumberOfPeople(Number(e.currentTarget.value));
      setIsDisabledMoveToDepositCheckPage(false);
    } else {
      e.currentTarget.value = '';
      setIsDisabledMoveToDepositCheckPage(true);
    }
  };

  const handleChangeDepositCheckInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.value === '완료') {
      setIsDisabledMoveToFinishPage(false);
    } else {
      setIsDisabledMoveToFinishPage(true);
    }
  };

  const handleCheckEnter = (e: KeyboardEvent) => {
    if (e.key === 'Tab') e.preventDefault();
    if (e.key === 'Enter') {
      if (page === 'UserName') !isDisabledMoveToPhoneNumberPage && setPage('PhoneNumber');
      else if (page === 'PhoneNumber') !isDisabledMoveToAgreemetnPage && setPage('Agreement');
      else if (page === 'Agreement') !isDisabledMoveToNumberOfPeoplePage && setPage('NumberOfPeople');
      else if (page === 'NumberOfPeople') !isDisabledMoveToDepositCheckPage && setPage('DepositCheck');
      else if (page === 'DepositCheck') !isDisabledMoveToFinishPage && setPage('Finish');
    }
  };

  useEffect(() => {
    setTimeout(() => {
      if (page === 'UserName') userNameRef.current?.focus();
      if (page === 'PhoneNumber') {
        if (phoneNumberRef.current && phoneNumberRef.current?.value === '') {
          phoneNumberRef.current.value = phoneNumber;
          setIsDisabledMoveToAgreemetnPage(false);
        }
        phoneNumberRef.current?.focus();
      }
      if (page === 'Agreement') agreementRef.current?.focus();
      if (page === 'NumberOfPeople') numberOfPeopleRef.current?.focus();
      if (page === 'DepositCheck') depositCheckRef.current?.focus();
    }, 550);
  }, [page]);

  return (
    <div className="relative w-full h-full overflow-hidden">
      <form
        className={`flex ${page === 'PhoneNumber' && '-translate-x-[16.666%]'} ${
          page === 'Agreement' && '-translate-x-[33.333%]'
        } ${page === 'NumberOfPeople' && '-translate-x-[50%]'} ${page === 'DepositCheck' && '-translate-x-[66.667%]'} ${
          page === 'Finish' && '-translate-x-[83.333%]'
        } w-[600%] bg-transparent rounded transition-all ease-in-out duration-[0.5s]`}
        onKeyDown={handleCheckEnter}
      >
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
          <div className="flex justify-around w-2/3 m-auto ">
            <Button onClick={() => setPage('PhoneNumber')} disabled={isDisabledMoveToPhoneNumberPage}>
              다음
            </Button>
          </div>
          <MoreDescriptionContainer>
            <MoreDescription page="UserName" amount={amount} numberOfPeople={numberOfPeople} />
          </MoreDescriptionContainer>
        </FormPageContainer>
        <FormPageContainer>
          <Input
            name="phonenumber"
            label="전화번호"
            type="tel"
            placeholder="전화번호를 입력해주세요"
            onKeyUp={handleKeyUpPhoneNumberInput}
            onChange={handleChangePhoneNumberInput}
            autoComplete="off"
            spellCheck={false}
            ref={phoneNumberRef}
          />
          <div className="flex justify-around w-2/3 m-auto ">
            <Button onClick={() => setPage('UserName')} disabled={false}>
              이전
            </Button>
            <Button onClick={() => setPage('Agreement')} disabled={isDisabledMoveToAgreemetnPage}>
              다음
            </Button>
          </div>
          <MoreDescriptionContainer>
            <MoreDescription page="PhoneNumber" amount={amount} numberOfPeople={numberOfPeople} />
          </MoreDescriptionContainer>
        </FormPageContainer>
        <FormPageContainer>
          <Input
            name="agreement"
            label="개인정보 수집 및 이용 동의"
            type="tel"
            placeholder="동의하신다면 '동의'라고 입력해주세요"
            onChange={handleChangeAgreementInput}
            autoComplete="off"
            spellCheck={false}
            ref={agreementRef}
          />
          <div className="flex justify-around w-2/3 m-auto ">
            <Button onClick={() => setPage('PhoneNumber')} disabled={false}>
              이전
            </Button>
            <Button onClick={() => setPage('NumberOfPeople')} disabled={isDisabledMoveToNumberOfPeoplePage}>
              다음
            </Button>
          </div>
          <MoreDescriptionContainer>
            <MoreDescription page="Agreement" amount={amount} numberOfPeople={numberOfPeople} />
          </MoreDescriptionContainer>
        </FormPageContainer>
        <FormPageContainer>
          <Input
            name="numberOfPeople"
            label={`예매자 인원 수 (1 ~ ${numberLimit} 사이의 숫자)`}
            type="number"
            placeholder="예매 인원 수를 적어주세요"
            onChange={handleChangeNumberOfPeopleInput}
            autoComplete="off"
            spellCheck={false}
            ref={numberOfPeopleRef}
          />
          <div className="flex justify-around w-2/3 m-auto ">
            <Button onClick={() => setPage('Agreement')} disabled={false}>
              이전
            </Button>
            <Button onClick={() => setPage('DepositCheck')} disabled={isDisabledMoveToDepositCheckPage}>
              다음
            </Button>
          </div>
          <MoreDescriptionContainer>
            <MoreDescription page="NumberOfPeople" amount={amount} numberOfPeople={numberOfPeople} />
          </MoreDescriptionContainer>
        </FormPageContainer>
        <FormPageContainer>
          <Input
            name="depositCheck"
            label="입금 확인"
            type="text"
            placeholder="입금을 하고 '완료'라고 입력해주세요"
            onChange={handleChangeDepositCheckInput}
            autoComplete="off"
            spellCheck={false}
            ref={depositCheckRef}
          />
          <div className="flex justify-around w-2/3 m-auto ">
            <Button onClick={() => setPage('NumberOfPeople')} disabled={false}>
              이전
            </Button>
            <Button onClick={() => setPage('Finish')} disabled={isDisabledMoveToFinishPage}>
              다음
            </Button>
          </div>
          <MoreDescriptionContainer>
            <MoreDescription page="DepositCheck" amount={amount} numberOfPeople={numberOfPeople} />
          </MoreDescriptionContainer>
        </FormPageContainer>
        <FormPageContainer>
          <Label text="예매 폼 작성이 완료되었습니다." />
          <Button onClick={() => setPage('DepositCheck')} disabled={false}>
            이전
          </Button>
          <Button onClick={() => handleClickSubmitButton()} disabled={false}>
            예매 폼 제출하기
          </Button>
          <MoreDescriptionContainer>
            <MoreDescription page="Finish" amount={amount} numberOfPeople={numberOfPeople} />
          </MoreDescriptionContainer>
        </FormPageContainer>
      </form>
    </div>
  );
}