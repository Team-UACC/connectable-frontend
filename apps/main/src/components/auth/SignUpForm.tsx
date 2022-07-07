import { KeyboardEvent, useState } from 'react';

import { putUser } from '~/apis/users';

type SignUpFromPage = 'UserName' | 'PhoneNumber' | 'Finish';

const formatPhoneNumber = (value: string) => {
  if (!value) return value;

  const phoneNumber = value.replace(/[^\d]/g, '');

  const phoneNumberLength = phoneNumber.length;

  if (phoneNumberLength < 4) return phoneNumber;

  if (phoneNumberLength < 7) {
    return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3)}`;
  }

  return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3, 7)}-${phoneNumber.slice(7, 11)}`;
};

export default function SingUpForm() {
  const [page, setPage] = useState<SignUpFromPage>('UserName');

  const onKeyUpPhoneNumberInput = (e: KeyboardEvent<HTMLInputElement>) => {
    e.currentTarget.value = formatPhoneNumber(e.currentTarget.value);
  };

  return (
    <div className="w-full">
      <form
        className={`flex ${page === 'PhoneNumber' && '-translate-x-1/3'} ${
          page === 'Finish' && '-translate-x-2/3'
        } w-[300%] pt-6 pb-8 mb-4 bg-white rounded overflow-visible transition-all ease-in-out duration-[1s]`}
      >
        <div className="flex flex-col w-full mb-4">
          <PageLabel text="닉네임" htmlFor="username" />
          <input
            className={` w-3/4 px-3 py-2 m-auto mb-6 leading-tight font-semibold text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline`}
            id="username"
            type="text"
            placeholder="닉네임을 입력해주세요"
          />
          <MoveButton text="다음" onClick={() => setPage('PhoneNumber')} />
        </div>
        <div className="w-full mb-4">
          <PageLabel text="전화번호" htmlFor="phonenumber" />
          <input
            className="w-3/4 px-3 py-3 m-auto mb-6 font-semibold leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            id="phonenumber"
            type="tel"
            placeholder="전화번호를 입력해주세요"
            onKeyUp={onKeyUpPhoneNumberInput}
          />
          <div className="flex justify-around w-2/3 m-auto ">
            <MoveButton text="이전" onClick={() => setPage('UserName')} />
            <MoveButton text="다음" onClick={() => setPage('Finish')} />
          </div>
        </div>
        <div className="flex flex-col w-full mb-4">
          <PageLabel text="Connectable에 오신 걸 환영합니다." />
          <MoveButton text="이전" onClick={() => setPage('PhoneNumber')} />
          <div className=" min-h-[14px]"></div>
          <MoveButton text="회원가입 완료하기" onClick={() => putUser('0x00', '010-0000-0000', 'UACC')} />
        </div>
      </form>
      <MoreDescription page={page} />
    </div>
  );
}

const PageLabel = ({ text, htmlFor }: { text: string; htmlFor?: string }) => (
  <label htmlFor={htmlFor} className="block mb-6 text-lg font-bold text-gray-700">
    {text}
  </label>
);

const MoveButton = ({ text, onClick }: { text: string; onClick: () => void }) => {
  return (
    <button
      className=" gap-2 w-fit m-auto rounded-lg px-[16px] py-[8px] font-bold text-white bg-blue hover:shadow-red hover:drop-shadow-2xl focus:outline-none focus:shadow-outline"
      type="button"
      onClick={onClick}
    >
      {text}
    </button>
  );
};

const MoreDescription = ({ page }: { page: SignUpFromPage }) => {
  return (
    <>
      {page === 'UserName' && (
        <p className="text-sm font-light gray-500 ">
          닉네임은 Connectable에서 보여질 이름입니다.
          <br />
          나중에 언제든지 수정할 수 있어요.
        </p>
      )}
      {page === 'PhoneNumber' && (
        <p className="text-sm font-light gray-500 ">
          정책에 의하여 전화번호를 수집합니다.
          <br />
          약관를 확인해주세요.
        </p>
      )}
      {page === 'Finish' && (
        <p className="mb-5 text-sm font-semibold text-red ">
          안녕하세요, 버튼을 눌러 회원가입을 완료하세요.
          <br />
        </p>
      )}
    </>
  );
};
