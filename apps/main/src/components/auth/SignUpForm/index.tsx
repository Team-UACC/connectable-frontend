export type SignUpFromPage = 'UserName' | 'PhoneNumber' | 'Finish';
import { KeyboardEvent, useEffect, useRef, useState } from 'react';

import Button from '~/components/Button';
import useUserInfoForm from '~/hooks/useUserInfoForm';

import MoreDescription from './MoreDescription';
import PageLabel from './PageLabel';

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
        <div className="relative flex flex-col w-full mb-4 ">
          <PageLabel text="닉네임" htmlFor="username" />
          <span className="absolute w-full text-xs -translate-x-1/2 text-red left-1/2 top-[2rem]">
            {validationNickName === 'OVERLAP'
              ? '중복된 닉네임입니다.'
              : '닉네임은 영어 / 한글 / 숫자 / 2~20자 사이로 작성해주세요.'}
          </span>
          <input
            className={` w-3/4 px-3 py-3 m-auto mb-6 leading-tight font-semibold text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline`}
            id="username"
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
        </div>
        <div className="w-full mb-4">
          <PageLabel text="전화번호" htmlFor="phonenumber" />
          <input
            className="w-3/4 px-3 py-3 m-auto mb-6 font-semibold leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            id="phonenumber"
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
        </div>
        <div className="flex flex-col w-full mb-4">
          <PageLabel text="Connectable에 오신 걸 환영합니다." />
          <Button onClick={() => setPage('PhoneNumber')} disabled={false}>
            이전
          </Button>
          <div className=" min-h-[14px]"></div>
          <Button onClick={() => handleClickSubmitButton()} disabled={false}>
            회원가입 완료하기
          </Button>
        </div>
      </form>
      <MoreDescription page={page} />
    </div>
  );
}
