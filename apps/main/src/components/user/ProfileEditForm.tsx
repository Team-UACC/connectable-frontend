import { KeyboardEvent, useRef, useState } from 'react';

import Button from '~/components/Button';
import useUserInfoForm from '~/hooks/useUserInfoForm';

interface Props {
  userName: string;
  phoneNumber: string;
}

export default function ProfileEditForm({ userName, phoneNumber }: Props) {
  const userNameRef = useRef<HTMLInputElement>(null);
  const phoneNumberRef = useRef<HTMLInputElement>(null);

  const {
    handleChangeNickNameInput,
    handleChangePhoneNumberInput,
    handleClickSubmitButton,
    validationNickName,
    validationPhoneNumber,
  } = useUserInfoForm({
    userNameRef,
    phoneNumberRef,
  });

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') handleClickSubmitButton();
  };

  return (
    <div className="w-full mb-10">
      <form onKeyDown={handleKeyDown} className={`flex w-full pt-6 pb-8 mb-4 bg-transparent rounded overflow-hidden `}>
        <div className="relative flex flex-col w-full mb-4 ">
          <h1 className="block mb-6 text-lg font-bold text-gray-700">닉네임</h1>
          <span className="absolute w-full text-xs -translate-x-1/2 text-red left-1/2 top-[1.75rem]">
            {validationNickName === 'OVERLAP'
              ? '중복된 닉네임입니다.'
              : '닉네임은 영어 / 한글 / 숫자 / 2~20자 사이로 작성해주세요.'}
          </span>
          <input
            className={` w-3/4 px-3 py-3 m-auto mb-6 leading-tight font-semibold text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline`}
            id="username"
            type="text"
            placeholder="닉네임을 입력해주세요"
            defaultValue={userName}
            onChange={handleChangeNickNameInput}
            autoComplete="off"
            ref={userNameRef}
          />
          <h1 className="block mb-4 text-lg font-bold text-gray-700">전화번호</h1>
          <input
            className="w-3/4 px-3 py-3 m-auto mb-6 font-semibold leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            id="phonenumber"
            type="tel"
            placeholder="전화번호를 입력해주세요"
            defaultValue={phoneNumber}
            onChange={handleChangePhoneNumberInput}
            autoComplete="off"
            ref={phoneNumberRef}
          />
          <Button
            onClick={() => handleClickSubmitButton()}
            disabled={validationNickName !== true || validationPhoneNumber !== true}
          >
            수정하기
          </Button>
        </div>
      </form>
    </div>
  );
}
