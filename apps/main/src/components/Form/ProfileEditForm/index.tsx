import { KeyboardEvent, ReactNode, useEffect, useRef } from 'react';

import Button from '~/components/Button';
import Input from '~/components/Input';
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
    setValidationNickName,
    setValidationPhoneNumber,
  } = useUserInfoForm({
    userNameRef,
    phoneNumberRef,
  });

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') handleClickSubmitButton();
  };

  useEffect(() => {
    userNameRef.current?.focus();
    setValidationNickName(true);
    setValidationPhoneNumber(true);
  }, []);

  useEffect(() => {
    if (userNameRef.current?.value === userName) {
      setValidationNickName(true);
    }
  }, [validationNickName]);

  return (
    <div className="w-full overflow-hidden">
      <form onKeyDown={handleKeyDown} className={`flex mt-[3rem] w-full bg-transparent `}>
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
            defaultValue={userName}
            onChange={handleChangeNickNameInput}
            autoComplete="off"
            spellCheck="false"
            ref={userNameRef}
          />
          <div />
          <div />
          <Input
            name="phonenumber"
            label="전화번호"
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
        </FormPageContainer>
      </form>
    </div>
  );
}

const FormPageContainer = ({ children }: { children: ReactNode }) => (
  <div className="relative w-full max-w-[18rem] h-[60vh] m-auto ">
    <div className=" absolute w-full top-1/2 -translate-y-[60%] flex flex-col gap-[1rem]">{children}</div>
  </div>
);
