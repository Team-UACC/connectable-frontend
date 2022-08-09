import Footer from '~/components/Footer';
import HeadMeta from '~/components/HeadMeta';
import Text from '~/components/Text';
import DotText from '~/components/Text/DotText';
import { BUISNESS } from '~/constants/company';
import { data } from '~/constants/seo';

export default function PrivacyPolicy() {
  return (
    <>
      <HeadMeta
        title={`Connectable | 개인정보처리방침`}
        image={data.images.logo}
        url={data.url + `/docs/privacy-policy`}
      />

      <article className="w-full pb-[5rem] flex flex-col top-1/2 left-1/2 min-w-[320px] gap-4">
        <header>
          <h1 className="text-[2rem] font-bold ">개인정보처리방침</h1>
        </header>
        <section className="whitespace-pre-line">
          <h2 className="font-bold text-4">1. 개인정보처리방침의 의의</h2>
          <br />
          <Text>
            커넥터블은 본 개인정보처리방침은 개인정보보호법을 기준으로 작성하되, 커넥터블 내에서의 이용자 개인정보 처리
            현황을 최대한 알기 쉽고 상세하게 설명하기 위해 노력하였습니다.
          </Text>
          <hr className=" w-full bg-transparent border-b-[1px] border-slate-200 my-2" />
        </section>
        <section className="whitespace-pre-line">
          <h2 className="font-bold text-4">2. 수집하는 개인정보</h2>
          <p className="text-sm leading-6 ">
            <Text>
              이용자는 회원가입을 하지 않아도 이벤트 조회, 구매 가능 티켓 보기 등 커넥터블 서비스를 회원과 동일하게
              이용할 수 있습니다.
            </Text>
            <br />
            <br />
            <Text>
              이용자가 티켓 구매 등과 같이 회원제 서비스를 이용하기 위해 회원가입을 할 경우, 커넥터블은 서비스 이용을
              위해 필요한 최소한의 개인정보를 수집합니다.
            </Text>
            <br />
            <br />
            <Text>회원 가입 시점에 커넥터블이 이용자로부터 수집하는 개인정보를 아래와 같습니다.</Text>

            <DotText>회원 가입 시에 {`‘닉네임, 휴대전화번호, 암호화폐 지갑주소'`}를 필수항목으로 수집합니다.</DotText>
            <DotText>티켓 구매 시에 ‘구매자 성함, 휴대전화번호’를 필수항목으로 수집합니다.</DotText>
          </p>
          <hr className=" w-full bg-transparent border-b-[1px] border-slate-200 my-2" />
        </section>
        <section className="whitespace-pre-line">
          <h2 className="font-bold text-4">3. 수집한 개인정보의 이용</h2>
          <p className="text-sm leading-6 ">
            <Text>
              커넥터블 제반 서비스의 회원관리, 서비스 개발·제공 및 향상, 안전한 인터넷 이용환경 구축 등 아래의
              목적으로만 개인정보를 이용합니다.
            </Text>
            <br />
            <DotText>
              회원 가입 의사의 확인, 이용자 식별, 회원탈퇴 의사의 확인 등 회원관리를 위하여 개인정보를 이용합니다.
            </DotText>
            <DotText>유료 서비스 제공에 따르는 구매 및 요금 결제를 위하여 개인정보를 이용합니다.</DotText>
            <DotText>
              이벤트 정보 및 참여기회 제공, 광고성 정보 제공 등 마케팅 및 프로모션 목적으로 개인정보를 이용합니다.
            </DotText>
            <DotText>
              서비스 이용기록과 접속 빈도 분석, 서비스 이용에 대한 통계, 서비스 분석 및 통계에 따른 맞춤 서비스 제공 및
              광고 게재 등에 개인정보를 이용합니다.
            </DotText>
          </p>
          <hr className=" w-full bg-transparent border-b-[1px] border-slate-200 my-2" />
        </section>
        <section className="whitespace-pre-line">
          <h2 className="font-bold text-4">4. 개인정보의 파기</h2>
          <p className="text-sm leading-6 ">
            <Text>
              회사는 원칙적으로 이용자의 개인정보를 탈퇴 후 보관하여 1년이 되는 시점에 지체없이 파기하고 있습니다.
            </Text>
          </p>
          <hr className=" w-full bg-transparent border-b-[1px] border-slate-200 my-2" />
        </section>
        <section className="whitespace-pre-line">
          <h2 className="font-bold text-4">5. 개인정보 보호책임자 및 담당자 안내</h2>
          <p className="text-sm leading-6 ">
            <Text>개인정보 보호책임자 : 조영상</Text>
            <br />
            <a
              href={`mailto:${BUISNESS.EMAIL}`}
              target="_blank"
              className="text-blue-500 cursor-pointer "
              rel="noreferrer"
            >
              문의하기
            </a>
          </p>
          <hr className=" w-full bg-transparent border-b-[1px] border-slate-200 my-2" />
        </section>
      </article>
      <Footer />
    </>
  );
}
