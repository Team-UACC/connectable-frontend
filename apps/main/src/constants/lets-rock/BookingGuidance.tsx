import DotText from '~/components/Text/DotText';

const BookingGuidance = () => {
  return (
    <div className="w-full px-2 py-4 text-sm">
      <h2 className="mb-2 text-xl font-bold">예매 안내</h2>
      <a
        className="text-blue-500 "
        href={'https://nosy-whimsey-4c1.notion.site/19-d7ade26b5cea4586b55849aa8082209a'}
        target="_blank"
        rel="noreferrer"
      >
        [필독] <span className="underline ">코로나19 예방을 위한 관람 수칙 및 관객 안내</span>
      </a>
      <ul>
        <DotText>{`본 티켓은 <2022 렛츠락 페스티벌> 9월 24일(토)과 25일(일) 양일간(2일권) 공연을 관람할 수 있는 NFT 티켓입니다.`}</DotText>
        <DotText>NFT 티켓의 아트워크가 다르더라도 티켓의 기능은 동일합니다.</DotText>
        <DotText>모든 티켓에는 부가세, 저작권료, 티켓 수수료가 포함되어 있습니다.</DotText>
        <DotText>본 공연은 전체관람가로, 8세 이상(2014년생 이상)은 반드시 티켓을 구매해야 입장이 가능합니다.</DotText>
        <DotText>
          8세 미만의 유/아동은 티켓을 소지한 보호자 1인 동반시 무료입장 가능하며 생년월일을 증명할 수 있는
          증빙자료(여권, 주민등록등본, 의료보험증)를 반드시 지참하셔야 합니다.
          <br />- 증빙자료 미지참 혹은 확인이 어려울 경우 입장이 불가하며, 별도로 티켓을 구매해야 입장이 가능합니다.
          <br />- 해당 사유로 인한 공연 당일 티켓의 환불 및 변경은 절대 불가합니다.
        </DotText>
        <DotText>예매 전 반드시 환불 규정 확인 후 예매를 진행해주시기 바랍니다.</DotText>
        <DotText>
          본 공연은 전염병 확산 및 천재지변, 사회적인 중대 이슈를 제외한 일반적인 우천시 예정대로 진행되며, 우천으로
          인한 취소나 환불은 불가능합니다.
        </DotText>
      </ul>
    </div>
  );
};

export default BookingGuidance;
