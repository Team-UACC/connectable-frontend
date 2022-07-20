export type SignUpFromPage = 'UserName' | 'PhoneNumber' | 'Finish';
import { KeyboardEvent, useEffect, useRef, useState } from 'react';

import Button from '~/components/Button';
import Input from '~/components/Input';
import Label from '~/components/Label';
import useUserInfoForm from '~/hooks/useUserInfoForm';

import FormPageContainer from '../FormPageContainer';
import MoreDescriptionContainer from '../MoreDescriptionContainer';

import MoreDescription from './MoreDescription';

export type SignUpFormPage = 'UserName' | 'PhoneNumber' | 'Finish';

export default function SingUpForm() {
  const [page, setPage] = useState<SignUpFormPage>('UserName');

  const userNameRef = useRef<HTMLInputElement>(null);
  const phoneNumberRef = useRef<HTMLInputElement>(null);

  const {
    handleChangePhoneNumberInput,
    handleClickSubmitButton,
    handleChangeNickNameInput,
    validationNickName,
    validationPhoneNumber,
  } = useUserInfoForm({
    userNameRef,
    phoneNumberRef,
  });

  const handleCheckEnter = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (page === 'UserName') validationNickName === true && setPage('PhoneNumber');
      else if (page === 'PhoneNumber') validationPhoneNumber === true && setPage('Finish');
      else handleClickSubmitButton();
    }
  };

  useEffect(() => {
    setTimeout(() => {
      if (page === 'UserName') userNameRef.current?.focus();
      if (page === 'PhoneNumber') phoneNumberRef.current?.focus();
    }, 500);
  }, [page]);

  return (
    <div className="w-full mb-10 overflow-hidden">
      <form
        className={`flex ${page === 'PhoneNumber' && '-translate-x-1/3'} ${
          page === 'Finish' && '-translate-x-2/3'
        } w-[300%] pt-6 pb-8 mb-4 bg-transparent rounded transition-all ease-in-out duration-[0.5s]`}
        onKeyDown={handleCheckEnter}
      >
        <FormPageContainer>
          <Input
            name="username"
            label="닉네임"
            notice={
              validationNickName === 'OVERLAP'
                ? '중복된 닉네임입니다.'
                : '닉네임은 영어 / 한글 / 숫자 / 2~20자 사이로 작성해주세요.'
            }
            type="text"
            placeholder="닉네임을 입력해주세요"
            onChange={handleChangeNickNameInput}
            autoComplete="off"
            spellCheck={false}
            ref={userNameRef}
          />
          <Button onClick={() => setPage('PhoneNumber')} disabled={validationNickName !== true}>
            다음
          </Button>
          <MoreDescriptionContainer>
            <MoreDescription page="UserName" />
          </MoreDescriptionContainer>
        </FormPageContainer>
        <FormPageContainer>
          <Input
            name="phonenumber"
            label="전화번호"
            type="tel"
            placeholder="전화번호를 입력해주세요"
            onChange={handleChangePhoneNumberInput}
            autoComplete="off"
            spellCheck={false}
            ref={phoneNumberRef}
          />
          <div className="flex justify-around w-2/3 m-auto ">
            <Button onClick={() => setPage('UserName')} disabled={false}>
              이전
            </Button>
            <Button onClick={() => setPage('Finish')} disabled={validationPhoneNumber !== true}>
              다음
            </Button>
          </div>
          <MoreDescriptionContainer>
            <MoreDescription page="PhoneNumber" />
          </MoreDescriptionContainer>
        </FormPageContainer>
        <FormPageContainer>
          <Label text="Connectable에 오신 걸 환영합니다." />
          <Button onClick={() => setPage('PhoneNumber')} disabled={false}>
            이전
          </Button>
          <Button onClick={() => handleClickSubmitButton()} disabled={false}>
            회원가입 완료하기
          </Button>
          <MoreDescriptionContainer>
            <MoreDescription page="Finish" />
          </MoreDescriptionContainer>
        </FormPageContainer>
      </form>
    </div>
  );
}
