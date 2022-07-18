import { SignUpFromPage } from '.';

export default function MoreDescription({ page }: { page: SignUpFromPage }) {
  return (
    <>
      {page === 'UserName' && (
        <p className="text-sm gray-600 ">
          닉네임은 Connectable에서 보여질 이름입니다.
          <br />
          나중에 언제든지 수정할 수 있어요.
        </p>
      )}
      {page === 'PhoneNumber' && (
        <p className="text-sm gray-600 ">
          정책에 의하여 전화번호를 수집합니다.
          <br />
          약관를 확인해주세요.
        </p>
      )}
      {page === 'Finish' && (
        <p className="pb-5 text-sm font-semibold text-red ">
          안녕하세요, 버튼을 눌러 회원가입을 완료하세요.
          <br />
        </p>
      )}
    </>
  );
}
