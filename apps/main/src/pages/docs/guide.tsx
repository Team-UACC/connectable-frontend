import Link from 'next/link';

import DotText from '~/components/DotText';
import Footer from '~/components/Footer';
import Text from '~/components/Text';

export default function Guide() {
  return (
    <>
      <article className="w-full pb-[5rem] flex flex-col top-1/2 left-1/2 min-w-[320px] gap-8">
        <header>
          <h1 className=" m-auto text-center text-[2rem] font-bold ">Connectable 안내서</h1>
        </header>
        <figure className="flex p-4 bg-gray-200 rounded-[3px]">
          <div className="my-auto mr-4">
            <span>🎫</span>
          </div>
          <div>안녕하세요, NFT 티켓팅 서비스로 온라인 티켓을 혁신하는 Connectable입니다.</div>
        </figure>
        <section className="whitespace-pre-line">
          <h2 className="font-bold text-4">Connectable은 어떻게 온라인 티켓을 혁신하나요?</h2>
          <hr className=" w-full bg-transparent border-b-[1px] border-slate-200 my-2" />
          <section>
            <h3 className="mt-4 font-bold text-4">디지털 수집품</h3>
            <p className="text-sm leading-8 ">
              <DotText>
                우리가 즐겼던 공연의 티켓은 이제 <span className="font-semibold text-red">NFT</span>가 됩니다.
              </DotText>
              <DotText>
                티켓은 단순한 입장권이 아닌 <span className="font-semibold text-red">디지털 수집품</span>으로
                거듭납니다.
              </DotText>
              <DotText>온-오프라인을 잇는 새로운 팬덤 문화를 구축합니다.</DotText>
              <DotText>
                NFT를 통해 아티스트와 팬은 <span className="font-semibold text-red">직접적인 소통과 이벤트</span>의
                기회를 갖게 됩니다.
              </DotText>
              <DotText>데이터를 통해 진정한 소비자와 전문 리셀러를 구분할 수 있습니다.</DotText>
              <DotText>NFT 티켓의 소유 여부를 손쉽게 팬서비스 이벤트에 사용할 수 있습니다.</DotText>
            </p>
          </section>
          <section>
            <h3 className="mt-4 font-bold text-4">티켓 양도 방식의 혁신</h3>
            <p className="text-sm leading-8 ">
              <DotText>
                NFT의 특징을 활용해 <span className="font-semibold text-red">티켓 위변조와 사기 거래를 방지</span>
                합니다.
              </DotText>
              <DotText>NFT의 거래 방식을 활용해 무분별한 리셀 티켓의 가격을 통제합니다.</DotText>
              <p className="flex flex-col gap-4 mt-2 leading-6 ">
                <Text>
                  현재, 2차 티켓 리셀 시장의 대부분의 몫은 전문 리셀러나 중개 업체에게만 이득이 돌아가고 있습니다.
                </Text>
                <Text>
                  Connectable은 NFT의 거래 방식을 활용해 리셀 가격의 일부가 영구적으로 아티스트에게 돌아가는{' '}
                  <span className="font-semibold text-red">시장의 선순환</span>을 가져옵니다.
                </Text>
                <Text>
                  그리고 소비자는 더 이상 중고 플랫폼이나 SNS에서 불확실한 상대와 거래할 필요가 없으며, 티켓 발행자가
                  지정한 가격 내에서만 양도를 진행할 수 있습니다.
                </Text>
              </p>
            </p>
          </section>
          <h2 className="mt-6 font-bold text-brand ">
            앞으로 아티스트의 공연에 참여했던 기록은 NFT로 기억되어 팬덤 문화와 공연 티켓 시장에 새로운 생태계를
            만들어갑니다.
          </h2>
        </section>
        <section className="whitespace-pre-line">
          <h2 className="font-bold text-4">Connectable을 어떻게 사용하나요?</h2>
          <hr className=" w-full bg-transparent border-b-[1px] border-slate-200 my-2" />
          <section>
            <h3 className="mt-4 font-bold text-4">Klip 지갑</h3>
            <p className="text-sm leading-4 ">
              <br />
              <Text>우선 NFT를 보관할 디지털 자산 지갑이 필요해요.</Text>
              <br />
              <br />
              <Text>
                Connectable은 현재{' '}
                <Link href={'/'}>
                  <a className="text-blue-500 cursor-pointer">Klip</a>
                </Link>{' '}
                지갑으로 로그인을 해야 이용할 수 있습니다.
              </Text>
              <br />
              <br />
              <Text>
                Klip은 카카오톡 {`‘전체서비스'`} 에서 확인하거나 어플을 다운로드 받으면 쉽게 카카오톡으로 시작할 수
                있어요.
              </Text>
            </p>
          </section>
          <section>
            <h3 className="mt-4 font-bold text-4">티켓 구매</h3>
            <p className="text-sm leading-4 ">
              <br />
              <Text>
                <Link href={'/'}>
                  <a className="text-blue-500 cursor-pointer">메인 페이지</a>
                </Link>
                에서 현재 판매 중인 티켓들을 확인할 수 있어요.
              </Text>
              <br />
              <br />
              <Text>원하는 티켓을 선택하신 후, 예매 폼을 제출해주세요.</Text>
              <br />
              <br />
              <Text>예매 폼을 Connectable이 2시간 내로 확인하여 로그인한 Klip 지갑으로 티켓을 전송해드려요.</Text>
              <br />
              <br />
              <Text>
                혹시라도 예매 폼 제출 과정에서 문제가 생기면 언제든지{' '}
                <span className="text-blue-500 ">1:1 문의하기</span>를 이용해주세요.
              </Text>
              <br />
              <br />
              <Text>
                <span className=" text-red">1시간</span> 내로 해결할 수 있도록 도와드립니다.
              </Text>
              <br />
              <br />
              <Text>2022년 안에, 암호화폐와 카드 결제로 구매가 가능하도록 계획하고 있습니다.</Text>
            </p>
          </section>
          <section>
            <h3 className="mt-4 font-bold text-4">티켓 확인</h3>
            <p className="text-sm leading-4 ">
              <br />
              <Text>
                서비스 상단 바의 프로필 아이콘을 클릭하면{' '}
                <Link href={'/my'}>
                  <a className="text-blue-500 cursor-pointer">마이페이지</a>
                </Link>
                로 이동합니다.
              </Text>
              <br />
              <br />
              <Text>마이페이지에서 {`‘마이 티켓'`}을 확인할 수 있어요.</Text>
              <br />
              <br />
              <Text>본인의 티켓을 클릭하면 공유하기, 전송하기 기능을 사용할 수 있습니다.</Text>
            </p>
          </section>
        </section>
      </article>
      <Footer />
    </>
  );
}
