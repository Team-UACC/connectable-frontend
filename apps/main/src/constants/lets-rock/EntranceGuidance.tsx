import DotText from '~/components/Text/DotText';

const EntranceGuidance = () => {
  return (
    <div className="w-full px-2 py-4 text-sm">
      <h2 className="text-xl font-bold">입장 팔찌 및 입장 안내</h2>
      <ul>
        <DotText>
          공연 당일 반드시 스마트폰 혹은 그에 준하는 휴대기기로 스테이지 게이트에서 NFT 티켓을 증빙하셔야 입장팔찌
          수령이 가능합니다.
        </DotText>
        <DotText>마이페이지에서 본인의 티켓 상세페이지로 접속해, QR 입장 버튼으로 코드를 보여주세요.</DotText>
        <DotText>보유한 NFT 수량만큼의 입장 팔찌 교환을 원칙으로 합니다.</DotText>
      </ul>
    </div>
  );
};

export default EntranceGuidance;
