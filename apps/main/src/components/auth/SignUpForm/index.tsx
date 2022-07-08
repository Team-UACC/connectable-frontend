export type SignUpFromPage = 'UserName' | 'PhoneNumber' | 'Finish';
import { ChangeEvent, KeyboardEvent, useRef, useState } from 'react';

import { putUser } from '~/apis/users';
import Button from '~/components/Button';
import { useModalStore } from '~/stores/modal';
import { useUserStore } from '~/stores/user';

import MoreDescription from './MoreDescription';
import PageLabel from './PageLabel';

const formatPhoneNumber = (value: string) => {
  if (!value) return value;

  const phoneNumber = value.replace(/[^\d]/g, '');

  const phoneNumberLength = phoneNumber.length;

  if (phoneNumberLength < 4) return phoneNumber;

  if (phoneNumberLength < 8) {
    return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3)}`;
  }

  return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3, 7)}-${phoneNumber.slice(7, 11)}`;
};

export default function SingUpForm() {
  const { klaytnAddress, setIsLoggedIn, addUserState } = useUserStore();
  const { hideModal } = useModalStore();
  const [page, setPage] = useState<SignUpFromPage>('UserName');

  const [isDisabledMoveToPhoneNumberPage, setIsDisabledMoveToPhoneNumberPage] = useState(true);
  const [isDisabledMoveToFinishPage, setIsDisabledMoveToFinishPage] = useState(true);

  const userNameRef = useRef<HTMLInputElement>(null);
  const phoneNumberRef = useRef<HTMLInputElement>(null);

  const onChangeNickNameInput = (e: ChangeEvent<HTMLInputElement>) =>
    setIsDisabledMoveToPhoneNumberPage(e.currentTarget.value === '');

  const onChangePhoneNumberInput = (e: ChangeEvent<HTMLInputElement>) =>
    setIsDisabledMoveToFinishPage(e.currentTarget.value.length < 13);

  const onKeyUpPhoneNumberInput = (e: KeyboardEvent<HTMLInputElement>) => {
    e.currentTarget.value = formatPhoneNumber(e.currentTarget.value);
  };

  const onClickFinishButton = async () => {
    const phoneNumber = phoneNumberRef.current!.value;
    const nickname = userNameRef.current!.value;

    const data = await putUser(klaytnAddress, phoneNumber, nickname);

    if (data.status === 'success') {
      setIsLoggedIn(true);
      addUserState(nickname, klaytnAddress, phoneNumber);
      hideModal();
    }
  };

  return (
    <div className="w-full mb-10">
      <form
        className={`flex ${page === 'PhoneNumber' && '-translate-x-1/3'} ${
          page === 'Finish' && '-translate-x-2/3'
        } w-[300%] pt-6 pb-8 mb-4 bg-white rounded overflow-hidden transition-all ease-in-out duration-[1s]`}
      >
        <div className="flex flex-col w-full mb-4">
          <PageLabel text="닉네임" htmlFor="username" />
          <input
            className={` w-3/4 px-3 py-2 m-auto mb-6 leading-tight font-semibold text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline`}
            id="username"
            type="text"
            placeholder="닉네임을 입력해주세요"
            onChange={onChangeNickNameInput}
            ref={userNameRef}
          />
          <Button onClick={() => setPage('PhoneNumber')} disabled={isDisabledMoveToPhoneNumberPage}>
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
            onKeyUp={onKeyUpPhoneNumberInput}
            onChange={onChangePhoneNumberInput}
            ref={phoneNumberRef}
          />
          <div className="flex justify-around w-2/3 m-auto ">
            <Button onClick={() => setPage('UserName')} disabled={false}>
              이전
            </Button>
            <Button onClick={() => setPage('Finish')} disabled={isDisabledMoveToFinishPage}>
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
          <Button onClick={onClickFinishButton} disabled={false}>
            회원가입 완료하기
          </Button>
        </div>
      </form>
      <MoreDescription page={page} />
    </div>
  );
}
