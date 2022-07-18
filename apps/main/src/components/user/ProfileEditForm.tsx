import { KeyboardEvent, useRef, useState } from 'react';

import Button from '~/components/Button';
import useUserInfoForm from '~/hooks/useUserInfoForm';

interface Props {
  userName: string;
  phoneNumber: string;
}

export default function ProfileEditForm({ userName, phoneNumber }: Props) {
  const [isDisabledSubmit, setIsDisabledSubmit] = useState(true);

  const userNameRef = useRef<HTMLInputElement>(null);
  const phoneNumberRef = useRef<HTMLInputElement>(null);

  const [handleKeyUpPhoneNumberInput, handleClickSubmitButton] = useUserInfoForm({ userNameRef, phoneNumberRef });

  const handleChange = () =>
    setIsDisabledSubmit(userNameRef.current!.value === '' || phoneNumberRef.current!.value.length < 13);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') handleClickSubmitButton();
  };

  return (
    <div className="w-full mb-10">
      <form onKeyDown={handleKeyDown} className={`flex w-full pt-6 pb-8 mb-4 bg-transparent rounded overflow-hidden `}>
        <div className="flex flex-col w-full mb-4">
          <h1 className="block mb-4 text-lg font-bold text-gray-700">닉네임</h1>
          <input
            className={` w-3/4 px-3 py-3 m-auto mb-6 leading-tight font-semibold text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline`}
            id="username"
            type="text"
            placeholder="닉네임을 입력해주세요"
            defaultValue={userName}
            onChange={handleChange}
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
            onKeyUp={handleKeyUpPhoneNumberInput}
            onChange={handleChange}
            autoComplete="off"
            ref={phoneNumberRef}
          />
          <Button onClick={() => handleClickSubmitButton()} disabled={isDisabledSubmit}>
            수정하기
          </Button>
        </div>
      </form>
    </div>
  );
}
