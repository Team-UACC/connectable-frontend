import Text from '~/components/Text';
import DotText from '~/components/Text/DotText';

const EtcGuidance = () => {
  return (
    <div className="w-full px-2 py-4 text-sm">
      <h2 className="text-xl font-bold">기타 공연 관람 시 주의사항</h2>
      <ul>
        <DotText>
          공연장 입장시 진행요원이 소지품 확인을 요구할 수 있습니다(입장팔찌 확인 및 반입금지 물품 확인 절차).
        </DotText>
        <DotText>공연장 내 안전과 쾌적한 관람 환경 조성을 위하여 반려동물 입장은 불가합니다.</DotText>
        <DotText>
          피크닉존 이용시 관객의 안전에 위험요소가 있다고 판단될 경우 진행요원이 자리이동을 요청할 수 있습니다.
        </DotText>
        <DotText>
          페스티벌 기간 중 공식 사진, 영상 촬영이 진행되며 추후 온&오프라인 홍보에 이용될 수 있어 관객 여러분의 얼굴이
          노출될 수 있는 점 양해 부탁드립니다.
        </DotText>
        <DotText>
          공연장 내에서의 일반적인 수준의 기념 사진 및 영상 촬영은 가능하나 스탠딩존 내에서의 촬영 장비 사용, SNS 채널을
          이용한 생중계, 공연 실황 녹음 등은 진행요원에 의하여 제지 받을 수 있습니다.
          <br /> 또한 적발시 데이터 삭제 요구 및 퇴장 등의 조치를 받을 수 있으니 유의하여 주시기 바랍니다.
        </DotText>
        <DotText>
          공연장 내/외에서 관람객 본인 부주의로 발생하는 사고, 도난, 분실 등은 주최측에서 책임지지 않으니 안전 및 귀중품
          보관에 유의하여 주시기 바랍니다.
        </DotText>
      </ul>
      <br />
      <Text>
        2022 렛츠락 페스티벌 관련 안내사항은 아래 공식 SNS 채널을 통해 공지될 예정이오니, 많은 관심 부탁드리겠습니다.
      </Text>
      <br />
      <br />
      <Text>
        Instagram :{' '}
        <a className="underline" href="https://www.instagram.com/letsrockfe" target="_blank" rel="noreferrer">
          https://www.instagram.com/letsrockfe
        </a>
      </Text>
      <br />
      <Text>
        Facebook :{' '}
        <a className="underline" href="https://www.facebook.com/letsrockfe" target="_blank" rel="noreferrer">
          https://www.facebook.com/letsrockfe
        </a>
      </Text>
      <br />
      <br />
      <br />
      <Text>
        본 렛츠락 페스티벌 NFT는{' '}
        <a className="text-blue-500 underline " href="https://ticket.3pm.earth/ko" target="_blank" rel="noreferrer">
          (주)쓰리피엠
        </a>
        과의 파트너십을 통해 공급됩니다.
      </Text>
      <br />
      <br />
      <Text>{`본 프로젝트는 한국콘텐츠진흥원의 '2022 ICT-음악(뮤직테크) 제작 지원 사업'으로 기획・운영됩니다.`}</Text>
    </div>
  );
};

export default EtcGuidance;
