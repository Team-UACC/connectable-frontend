import DotText from '~/components/Text/DotText';

import { BUSINESS } from '../company';
import { KAKAO_TALK_ONE_TO_ONE_CHAT } from '../link';

const RefundGuidance = () => {
  return (
    <div className="w-full px-2 py-4 text-sm">
      <h2 className="text-xl font-bold">환불, 취소 안내</h2>
      <ul>
        <DotText>
          NFT 티켓 구매 이후 6일 이내 환불 요청시 100% 환불되며, 7일 이후에는 10%의 환불 수수료가 부과됩니다.
        </DotText>
        <DotText>
          환불을 위해서는 {BUSINESS.EMAIL} 혹은{' '}
          <a className="text-blue-500 " href={KAKAO_TALK_ONE_TO_ONE_CHAT} target="_blank" rel="noreferrer">
            1:1 문의하기
          </a>{' '}
          채널로 환불 요청자의 성함, 전화번호를 기재하여 요청해주시기 바랍니다.
        </DotText>
        <DotText>
          취소 수수료 및 구체적인 환불 절차는{' '}
          <a
            href="https://quiet-harrier-305.notion.site/Connectable-b0403961e4e24261b763757648dd3231"
            target="_blank"
            rel="noreferrer"
            className="font-bold text-blue-500 underline "
          >
            여기
          </a>
          를 클릭해주세요.
        </DotText>
        <DotText>공연 당일 취소, 변경, 환불은 절대 불가합니다.</DotText>
      </ul>
    </div>
  );
};

export default RefundGuidance;
