import toast from 'react-hot-toast';

import { ACCOUNT } from 'src/constants/account';

import { OrderFormPageType } from '.';

export default function MoreDescription({
  page,
  amount,
  numberOfPeople,
}: {
  page: OrderFormPageType;
  amount: number;
  numberOfPeople: number;
}) {
  return (
    <>
      {page === 'UserName' && (
        <p className="text-sm min-h-[5rem] gray-600">예금주와 동일한 성함으로 작성해주시길 바랍니다.</p>
      )}
      {page === 'PhoneNumber' && (
        <p className="text-sm min-h-[5rem] gray-600 ">에매 및 공연 안내를 받을 전화번호를 입력해주세요</p>
      )}
      {page === 'Agreement' && (
        <p className="text-xs min-h-[5rem] font-bold text-start ml-8 ">
          개인정보 수집 이용 및 목적 : 공연 예매자 확인 및 관련 업무 수행
          <br />
          수집 항목 : 성명, 휴대폰번호
          <br />
          보유기간: 이용목적 달성 후 파기
          <br />
          동의를 거부할 수 있으며 동의 거부 시 공연 관람이 불가합니다.
          <br />
          동의하시면 {'동의'}를 입력해주세요.
        </p>
      )}
      {page === 'NumberOfPeople' && <p className="text-sm min-h-[5rem] gray-600">구매할 예매 티켓 개수를 적어주세요</p>}
      {page === 'DepositCheck' && (
        <p className="text-sm min-h-[5rem] text-red font-bold ">
          <span
            className="underline cursor-pointer"
            onClick={() => {
              navigator.clipboard.writeText(`${ACCOUNT.FLAT_NUMBER} ${ACCOUNT.BANK}`);
              toast.success('클립보드에 복사되었습니다.');
            }}
          >
            {ACCOUNT.BANK} {ACCOUNT.NUMBERL} ({ACCOUNT.OWNER})
          </span>{' '}
          으로
          <br />
          {(amount * numberOfPeople).toLocaleString('ko-KR')}원을 입금하시고 {'완료'}를 입력해주세요.
          <br />
          <br />
          <span className="text-xs text-gray-600 ">계좌번호를 클릭하면 복사됩니다.</span>
        </p>
      )}
      {page === 'Finish' && (
        <p className="text-sm font-semibold min-h-[5rem] ">
          티켓은 입금 확인 후 NFT로 전송됩니다. <br />
          4시간 내에 Connctable에서 확인할 수 있으며 <br />
          문의사항은 언제든 1:1 문의하기를 이용해주세요.
        </p>
      )}
    </>
  );
}
