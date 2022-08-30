import { SignUpFormPage } from '.';

export default function MoreDescription({ page }: { page: SignUpFormPage | 'UserName' | 'PhoneNumber' }) {
  return (
    <section className="w-full text-center">
      {page === 'Terms' && <></>}
      {page === 'UserName' && (
        <p className="text-sm gray-600 ">
          닉네임은 Connectable에서 보여질 이름입니다.
          <br />
          나중에 언제든지 수정할 수 있어요.
        </p>
      )}
      {page === 'PhoneNumber' && (
        <p className="text-sm gray-600 ">공연 예매자 확인 및 관련 업무 수행 시 이용에 사용됩니다.</p>
      )}
      {page === 'Finish' && (
        <p className="pb-5 text-sm font-semibold ">
          안녕하세요, 버튼을 눌러 회원가입을 완료하세요.
          <br />
        </p>
      )}
    </section>
  );
}
