import DotText from '~/components/DotText';
import Footer from '~/components/Footer';
import HeadMeta from '~/components/HeadMeta';
import Text from '~/components/Text';
import { data } from '~/constants/seo';

export default function TermOfService() {
  return (
    <>
      <HeadMeta
        title={`Connectable | 서비스 이용 약관`}
        image={data.images.logo}
        url={data.url + `/docs/terms-of-service`}
      />

      <article className="w-full pb-[5rem] flex flex-col top-1/2 left-1/2 min-w-[320px] gap-4">
        <header>
          <h1 className="text-[2rem] font-bold ">서비스 이용 약관</h1>
        </header>
        <section className="whitespace-pre-line">
          <h2 className="font-bold text-4">제1조 (목적)</h2>
          <br />
          <Text>
            이 약관은 UACC 팀(이하 {'"회사"'}라 합니다)이 제공하는 Connectable 및 Connectable 관련 제반 서비스의 이용에
            대해 회사와 회원의 권리, 의무 및 책임 사항, 기타 필요한 사항을 규정함을 목적으로 합니다.
          </Text>
          <hr className=" w-full bg-transparent border-b-[1px] border-slate-200 my-2" />
        </section>
        <section className="whitespace-pre-line">
          <h2 className="font-bold text-4">제2조 (용어의 정의)</h2>
          <p className="text-sm leading-6 ">
            <br />
            <Text>
              ① {'"서비스"'}라 함은 단말기(PC, 휴대형 단말기 등의 각종 유무선 장치를 포함)에 상관없이, 회원이 이용할 수
              있는 Connectable의 NFT 티켓 구매 서비스 및 이와 관련된 제반 서비스를 의미합니다.
            </Text>
            <br />
            <br />
            <Text>
              ② {'"회원"'}이라 함은 서비스에 접속하여 이 약관에 따라 회사와 이용계약을 체결하고, 회사가 제공하는
              서비스를 이용하는 고객을 말합니다.
            </Text>
            <br />
            <br />
            <Text>
              ③ {'"구성원"'}이라 함은 {'"회원"'}으로부터 Connectable 이용권한을 부여받아 {'"회원"'}의 관리하에
              Connectable을 이용하는 자를 의미하며, {'"회원"'}으로부터 부여받는 권한에 따라 {'"관리자"'} 및{' '}
              {'"일반 구성원"'}으로 구분됩니다.
            </Text>
            <br />
            <br />
            <Text>
              ④ {'"관리자"'}라 함은 Connectable의 모든 관리 기능을 이용할 수 있고, Connectable 이용계약을 해지할 수 있는
              {'"회원"'} 본인 또는 {'"회원"'}을 대표・대리하는 {'"구성원"'}을 의미합니다.
            </Text>
            <br />
            <br />
            <Text>⑤ {'"컬렉션"'}이란, NFT로 티켓이 발행된 공연 및 이벤트를 뜻합니다.</Text>
            <br />
            <br />
            <Text>
              ⑥ {'"NFT"'}이라 함은 대체 불가능 토큰(Non-Fungible Token)을 뜻하며, 서비스에서 구입할 수 있는,
              블록체인에서 전자적으로 존재하는 객체로 서비스의 대상물을 말합니다. NFT에는 콘텐츠가 연계되어 있으나,
              NFT가 해당 콘텐츠의 저작권, 상표권을 포함한 지식재산권이나 초상권, 상품화 권리 등의 특정 권리 그 자체를
              의미하는 것은 아닙니다. 단, NFT를 보유한 자에게는 다음의 권리(이하 {'"NFT 소유자의 권리"'})가 부여됩니다.
              아래 명시된 권리 이외의 권리는 NFT를 보유한 자에게 부여되지 않습니다.
            </Text>
            <DotText>
              NFT와 연계된 콘텐츠를 비상업적인 용도로 사용할 권리(외부 공개된 개인 SNS에 업로드하는 것을 포함하며, 원본
              그대로 개인적인 용도로 사용하는 것을 의미합니다)
            </DotText>
            <DotText>NFT 에 대한 배타적권리를 타인에게 이전할 권리</DotText>
            <DotText>기타 이벤트 성으로 제휴업체와 협약에 따라 인정되는 권리</DotText>
            <br />
            <Text>
              ⑦ {'"디지털 지갑"'}이라 함은 회원 혹은 다른 사람이 소유하거나 사용하는 모든 디지털 자산 주소 또는 계정을
              의미하며, 회원은 자신의 디지털 지갑을 서비스에 연결할 수 있고 디지털 지갑을 통해 NFT를 보관할 수 있습니다.
              회사는 디지털 지갑을 소유, 통제 또는 운영하지 않습니다.
            </Text>
            <br />
            <br />
            <Text>
              ⑧ {'"중요 제휴사"'}라 함은 {'"회사"'}와 제휴 계약 등을 체결하여 {'"서비스"'}의 중요한 일부 기능(로그인
              기능, 디지털 자산 거래소 연동 기능을 포함하며, 이에 한정하지 않습니다)을 제공하는 회사를 말합니다.
            </Text>
          </p>
          <hr className=" w-full bg-transparent border-b-[1px] border-slate-200 my-2" />
        </section>
        <section className="whitespace-pre-line">
          <h2 className="font-bold text-4">제3조 (약관의 명시와 설명 및 개정)</h2>
          <p className="text-sm leading-6 ">
            <br />
            <Text>① 회사는 이 약관의 내용을 회원이 쉽게 알 수 있도록 서비스 내 또는 연결화면을 통하여 게시합니다.</Text>
            <br />
            <br />
            <Text>② 회사는 필요한 경우 관련 법령을 위배하지 않는 범위에서 이 약관을 개정할 수 있습니다.</Text>
            <br />
            <br />
            <Text>
              ③ 회사가 이 약관을 개정할 경우에는 개정내용과 적용 일자를 명시하여 서비스에서 적용 일자 7일 전부터 적용
              일자 전날까지 공지합니다. 다만, 회원에게 불리한 변경의 경우에는 적용 일자 30일 전부터 공지합니다.
            </Text>
            <br />
            <br />
            <Text>
              ④ 회사가 전항에 따라 공지하면서 회원에게 적용 일자 전날까지 의사표시를 하지 않으면 의사표시가 표명된
              것으로 본다는 뜻을 명확하게 공지하였음에도 회원이 명시적으로 거부의 의사표시를 하지 아니한 경우 회원이
              개정약관에 동의한 것으로 봅니다.
            </Text>
            <br />
            <br />
            <Text>
              ⑤ 회원은 개정 약관에 동의하지 않는 경우 적용 일자 전날까지 회사에 거부 의사를 표시하고 서비스 이용계약을
              해지할 수 있습니다.
            </Text>
          </p>
          <hr className=" w-full bg-transparent border-b-[1px] border-slate-200 my-2" />
        </section>
        <section className="whitespace-pre-line">
          <h2 className="font-bold text-4">제4조 (약관의 해석)</h2>
          <p className="text-sm leading-6 ">
            <br />
            <Text>① 회사는 이 약관 외에 별도의 운영정책을 둘 수 있습니다.</Text>
            <br />
            <br />
            <Text>
              ② 이 약관에서 정하지 아니한 사항이나 해석에 대해서는 운영정책, 이용안내(웹), 이용가이드(앱), 관련 법령에
              따릅니다.
            </Text>
          </p>
          <hr className=" w-full bg-transparent border-b-[1px] border-slate-200 my-2" />
        </section>
        <section className="whitespace-pre-line">
          <h2 className="font-bold text-4">제5조 (이용계약 체결)</h2>
          <p className="text-sm leading-6 ">
            <br />
            <Text>
              ① 이용계약은 회원이 되고자 하는 자(이하 {'"가입 신청자"'}라 합니다)가 회사가 제공하는 약관의 내용에 대하여
              동의를 한 다음 회사가 정한 절차에 따라 가입신청을 완료하고, 회사가 이러한 신청에 대하여 승낙함으로써
              체결됩니다.
            </Text>
            <br />
            <br />
            <Text>
              ② 회사는 가입 신청자의 신청에 대하여 아래 각호에 해당하는 사유가 있는 경우에는 승낙하지 않을 수 있으며,
              가입 이후에도 아래 각호의 사유가 확인될 경우에는 승낙을 취소하거나 이용계약을 해지할 수 있습니다.
            </Text>
            <br />
            <DotText>가입 신청자가 이 약관에 의하여 이전에 회원자격을 상실한 적이 있는 경우</DotText>
            <DotText>실명이 아닌 명의 또는 타인의 명의를 이용한 경우</DotText>
            <DotText>허위 또는 잘못된 정보를 기재 또는 제공하거나, 회사가 제시하는 내용을 기재하지 않은 경우</DotText>
            <DotText>
              가입 신청자의 귀책 사유로 인하여 승인할 수 없거나 기타 이 약관에서 규정한 제반 사항을 위반하며 신청하는
              경우
            </DotText>
            <DotText>부정한 용도 또는 별개의 영업 목적으로 서비스를 이용하고자 하는 경우</DotText>
            <DotText>
              관련 법령에 어긋나거나 사회의 안녕질서 혹은 미풍양속을 저해할 수 있는 목적으로 신청한 경우
            </DotText>
            <DotText>미성년자가 청소년보호법에 의해서 이용이 금지되는 콘텐츠를 이용하고자 하는 경우</DotText>
            <br />
            <Text>
              ③ 회사는 회원이 제공한 정보가 사실과 일치하는지 여부를 확인하기 위하여 법령에 의하여 허용된 범위에서
              전문기관을 통한 실명확인 또는 본인인증을 요청할 수 있습니다.
            </Text>
          </p>
          <hr className=" w-full bg-transparent border-b-[1px] border-slate-200 my-2" />
        </section>
        <section className="whitespace-pre-line">
          <h2 className="font-bold text-4">제6조 (정보의 변경)</h2>
          <p className="text-sm leading-6 ">
            <br />
            <Text>
              ① 회원은 서비스를 통하여 언제든지 본인의 개인정보를 열람하고 수정할 수 있습니다. 다만, 서비스 관리를 위해
              필요한 디지털 지갑 주소는 수정할 수 없습니다.
            </Text>
            <br />
            <br />
            <Text>
              ② 회원은 회원가입신청 시 기재한 사항이 변경되었을 경우 서비스에서 직접 수정하거나 고객센터를 통하여 회사에
              변경 사항을 통지하여야 합니다.
            </Text>
            <br />
            <br />
            <Text>
              ③ 회원이 전항의 변경사항을 회사에 통지하지 않아 발생한 불이익에 대하여 회사는 책임을 지지 않습니다.
            </Text>
          </p>
          <hr className=" w-full bg-transparent border-b-[1px] border-slate-200 my-2" />
        </section>
        <section className="whitespace-pre-line">
          <h2 className="font-bold text-4">제7조 (개인정보보호의무)</h2>
          <p className="text-sm leading-6 ">
            <br />
            <Text>
              ① ‘회사’는 정보통신망 이용촉진 및 정보보호 등에 관한 법률 등 관련 법령이 정하는 바에 따라 ‘회원’의
              개인정보를 보호하기 위해 노력합니다.
            </Text>
            <br />
            <br />
            <Text>
              ② 개인정보의 보호 및 사용에 대해서는 관련 법령 및 ‘회사’의 개인정보처리방침이 적용됩니다. 다만, ‘회사’의
              공식 사이트 이외의 링크된 사이트에서는 ‘회사’의 개인정보처리방침이 적용되지 않습니다.
            </Text>
            <br />
            <br />
            <Text>
              ③ ‘회원’은 ‘구성원’의 개인정보처리자로서 개인정보보호법 등 관련 법령이 정한 바에 따라 ‘구성원’의
              개인정보를 보호하여야 합니다.
            </Text>
          </p>
          <hr className=" w-full bg-transparent border-b-[1px] border-slate-200 my-2" />
        </section>
        <section className="whitespace-pre-line">
          <h2 className="font-bold text-4">제8조 (개인정보의 보호)</h2>
          <p className="text-sm leading-6 ">
            <br />
            <Text>
              회사는 정보통신망 이용촉진 및 정보보호 등에 관한 법률, 개인정보 보호법 등 관련 법령이 정하는 바에 따라
              회원의 개인정보를 보호하기 위해 노력합니다. 개인정보의 보호 및 이용에 대해서는 관련 법령 및 회사의
              개인정보처리방침이 적용됩니다. 다만, 회사가 제작하여 제공한 화면 이외의 외부로 링크된 화면 등에서는 회사의
              개인정보처리방침이 적용되지 않습니다.
            </Text>
          </p>
          <hr className=" w-full bg-transparent border-b-[1px] border-slate-200 my-2" />
        </section>
        <section className="whitespace-pre-line">
          <h2 className="font-bold text-4">제9조 (회사의 의무)</h2>
          <p className="text-sm leading-6 ">
            <br />
            <Text>
              ① 회사는 관련 법령과 이 약관을 준수하며, 계속적이고 안정적으로 서비스를 제공하기 위하여 최선을 다하여
              노력합니다.
            </Text>
            <br />
            <br />
            <Text>
              ② 회사는 회원이 안전하게 서비스를 이용할 수 있도록 개인정보(신용정보 포함)보호를 위해 보안시스템을 갖출 수
              있으며, 개인정보처리방침을 공시하고 준수합니다.
            </Text>
            <br />
            <br />
            <Text>
              ③ 회사는 서비스 이용과 관련하여 회원으로부터 제기된 의견이나 불만이 정당하다고 인정할 경우에는 이를
              처리하여야 하며, 서비스 내 게시판, 전자우편 등을 통하여 회원에게 처리 과정 및 결과를 전달할 수 있습니다.
            </Text>
          </p>
          <hr className=" w-full bg-transparent border-b-[1px] border-slate-200 my-2" />
        </section>
        <section className="whitespace-pre-line">
          <h2 className="font-bold text-4">제10조 (회원의 의무)</h2>
          <p className="text-sm leading-6 ">
            <br />
            <Text>① 회원은 아래의 행위를 하여서는 안 됩니다.</Text>
            <DotText>타인의 정보도용</DotText>
            <DotText>회사가 게시한 정보의 변경</DotText>
            <DotText>회사가 정한 정보 이외의 정보(컴퓨터 프로그램 등) 등의 송신 또는 게시</DotText>
            <DotText>회사와 기타 제삼자의 저작권 등 지적 재산권에 대한 침해</DotText>
            <DotText>회사 및 기타 제삼자의 명예를 손상하거나 업무를 방해하는 행위</DotText>
            <DotText>
              외설 또는 폭력적인 메시지, 화상, 음성, 허위사실, 기타 공서양속에 반하는 정보를 서비스에 공개 또는 게시하는
              행위
            </DotText>
            <DotText>회사의 사전 동의 없이 영리를 목적으로 서비스를 사용하는 행위</DotText>
            <DotText>
              회사의 사전 승낙 없이 에이전트(Agent), 스크립트(Script), 스파이더(Spider), 스파이웨어(Spyware),
              툴바(Toolbar) 등의 자동화된 수단, 기타 부정한 방법을 통하여 서비스에 접속하는 행위, 노출횟수 및 클릭횟수를
              부정하게 생성하거나 증가시키는 행위, 서비스 이용 신청을 하는 행위, 회사의 서버에 부하를 일으키는 행위
            </DotText>
            <DotText>다른 회원의 개인정보 및 계정정보를 수집하는 행위</DotText>
            <DotText>디지털 자산의 시세에 부당한 영향을 주는 등의 방법으로 건전한 거래질서를 교란하는 행위</DotText>
            <DotText>기타 불법적이거나 부당한 행위</DotText>
            <br />
            <Text>
              ② 회원은 관계 법령, 이용약관, 이용안내(웹), 이용가이드(앱) 및 서비스와 관련하여 회사가 공지하거나 통지한
              사항 등을 준수하여야 하며, 기타 회사의 업무에 방해되는 행위를 하여서는 안 됩니다.
            </Text>
          </p>
          <hr className=" w-full bg-transparent border-b-[1px] border-slate-200 my-2" />
        </section>
        <section className="whitespace-pre-line">
          <h2 className="font-bold text-4">제11조 (서비스의 제공 및 변경)</h2>
          <p className="text-sm leading-6 ">
            <br />
            <Text>① 당사는 다음과 같은 서비스를 제공합니다.</Text>
            <DotText>NFT 티켓 거래 서비스</DotText>
            <DotText>NFT 티켓 발행 서비스</DotText>
            <DotText>커뮤니티 서비스</DotText>
            <br />
            <Text>
              ② {"'회사'"}는 상당한 이유가 있는 경우에 운영상, 기술상의 필요에 따라 제공하고 있는 {"'서비스'"}의 전부
              또는 일부를 변경할 수 있습니다.
            </Text>
            <br />
            <Text>
              ③ {"'회사'"}가 제공하기로 {"'회원'"}과 계약을 체결한 서비스의 내용을 서비스의 품질 또는 기술적 사양의 변경
              등의 사유로 변경할 경우에는 그 사유를 {"'회원'"}에게 이메일, SMS 등의 방법으로 통지합니다.
            </Text>
            <Text>
              ④ 전항의 경우 {"'회사'"}는 이로 인하여 {"'회원'"}이 입은 인과관계가 입증된 실제 손해를 배상합니다. 다만,{' '}
              {"'회사'"}가 고의 또는 과실이 없음을 입증하는 경우에는 그러하지 아니합니다.
            </Text>
            <Text>
              ⑤ {"'회사'"}는 서비스의 제공에 필요한 경우 정기점검을 실시할 수 있으며, 정기점검시간은 서비스제공화면에
              공지한 바에 따릅니다.
            </Text>
          </p>
          <hr className=" w-full bg-transparent border-b-[1px] border-slate-200 my-2" />
        </section>
        <section className="whitespace-pre-line">
          <h2 className="font-bold text-4">제12조 (서비스의 중단)</h2>
          <p className="text-sm leading-6 ">
            <br />
            <Text>
              ① ‘회사’는 컴퓨터 등 정보통신설비의 보수점검, 교체 및 고장, 통신두절 또는 운영상 상당한 이유가 있는 경우
              Connectable의 제공을 일시적으로 중단할 수 있습니다. 이 경우 ‘회사’는 Connectable의 제공이 중단되기 전에
              제9조에서 정한 방법으로 ‘회원’에게 통지합니다. 다만, ‘회사’가 사전에 통지할 수 없는 부득이한 사유가 있는
              경우 사후에 통지할 수 있습니다.
            </Text>
            <br />
            <Text>
              ② ‘회사’는 Connectable의 제공에 필요한 경우 정기점검을 실시할 수 있으며, 정기점검시간은 ‘서비스
              홈페이지’에 공지한 바에 따릅니다.
            </Text>
          </p>
          <hr className=" w-full bg-transparent border-b-[1px] border-slate-200 my-2" />
        </section>
        <section className="whitespace-pre-line">
          <h2 className="font-bold text-4">제13조 (정보의 제공 및 광고의 게재)</h2>
          <p className="text-sm leading-6 ">
            <br />
            <Text>
              ① ‘회사’는 ‘회원’이 Connectable 이용 중 필요하다고 인정되는 다양한 정보를 공지사항이나 전자우편,
              Connectable 기능(메시지) 등의 방법으로 ‘회원’에게 제공할 수 있습니다.
            </Text>
            <br />
            <Text>
              ② 제1항의 정보를 전화 및 모사전송기기에 의하여 전송하려고 하는 경우에는 ‘회원’의 사전 동의를 받아서
              전송합니다. 다만, ‘회원’의 거래관련 정보 및 고객문의 등에 대한 회신에 있어서는 제외됩니다.
            </Text>
            <br />
            <Text>
              ③ ‘회사’는 Connectable의 운영과 관련하여 Connectable 화면, ‘서비스 홈페이지’, ‘구성원’의 전자우편 등에
              서비스 이용과 관련된 안내 내용 또는 광고를 게재할 수 있습니다. 안내 내용 또는 광고가 게재된 전자우편을
              수신한 ‘회원’은 ‘회사’에 대하여 그 수신을 거절할 수 있습니다.
            </Text>
            <br />
            <Text>
              ④ ‘회원’은 Connectable와 관련하여 ‘회사’가 게시・제공하는 게시물 또는 기타 정보를 변경, 수정, 제한하는
              등의 조치를 취하지 않습니다.
            </Text>
          </p>
          <hr className=" w-full bg-transparent border-b-[1px] border-slate-200 my-2" />
        </section>
        <section className="whitespace-pre-line">
          <h2 className="font-bold text-4">제14조 (회원 탈퇴 및 자격 상실 등)</h2>
          <p className="text-sm leading-6 ">
            <br />
            <Text>
              ① {"'회원'"}은 {"'회사'"}에 언제든지 탈퇴를 요청할 수 있으며, {"'회사'"}는 관련법 등이 정하는 바에 따라
              이를 즉시 처리합니다. 단, 회원탈퇴 시 {"'회원'"}으로서의 모든 혜택이 소멸됩니다. 탈퇴로 인해 소멸된 혜택은
              복구가 불가능하며, {"'회사'"}는 이를 복구할 책임이 없습니다.
            </Text>
            <br />
            <br />
            <Text>
              ② 탈퇴로 인해 파기된 데이터에 대하여 {"'회사'"}는 차후 복구의 의무를 가지지 않으므로 {"'회원'"}은 탈퇴 전
              필요한 데이터를 백업해두어야 합니다.
            </Text>
            <br />
            <br />
            <Text>
              ③ {"'회원'"}이 다음 각 호의 사유에 해당하는 경우, {"'회사'"}는 회원자격을 제한 및 정지시킬 수 있습니다.
            </Text>
            <DotText>가입신청 시에 허위 내용을 등록하거나 타인의 정보를 도용한 경우</DotText>
            <DotText>{"'서비스'"}를 이용하여 법령 또는 이 약관이 금지하거나 공서양속에 반하는 행위를 하는 경우</DotText>
            <DotText>
              {"'서비스'"}를 이용하여 구입한 재화 등의 대금, 기타 {"'사이트'"} 이용에 관련하여 회원이 부담하는 채무를
              기일에 지급하지 않는 경우
            </DotText>
            <DotText>다른 사람의 {"'서비스'"} 이용을 방해하거나 그 정보를 도용하는 경우</DotText>
            <br />
            <Text>
              ④ {"'회원'"}이 {"'회사'"}의 업무에 방해되는 행위를 하였다 판단될 경우, 즉시 회원자격이 상실되며 {"'회사'"}
              는{"'회원'"}에게 별도의 손해배상 청구를 할 수 있습니다.
            </Text>
            <br />
            <br />
            <Text>
              ⑤ {"'회사'"}가 회원자격을 제한_정지 시킨 후 동일한 행위가 2회 이상 반복되거나 30일 이내에 그 사유가
              시정되지 아니하는 경우 회사는 회원자격을 상실시킬 수 있습니다.
            </Text>
            <br />
            <br />
            <Text>
              ⑥ {"'회사'"}가 회원자격을 상실시키는 경우에는 회원등록을 말소합니다. 이 경우 {"'회원'"}에게 이를 통지하고,
              회원등록 말소 전에 최소한 30일 이상의 기간을 정하여 소명할 기회를 부여합니다.
            </Text>
          </p>
          <hr className=" w-full bg-transparent border-b-[1px] border-slate-200 my-2" />
        </section>
        <section className="whitespace-pre-line">
          <h2 className="font-bold text-4">제15조 (이용제한 등)</h2>
          <p className="text-sm leading-6 ">
            <br />
            <Text>
              ① {"'회사'"}는 {"'회원'"}이 이 약관을 위반하거나 {"'회원'"}이 Connectable의 정상적인 운영을 방해한 경우,
              경고, 일시정지, 영구이용정지 등으로 {"'회원'"}의 Connectable 이용을 단계적으로 제한할 수 있습니다.
            </Text>
            <br />
            <br />
            <Text>
              ② {"'회사'"}는 전항에도 불구하고 명의도용, 저작권법을 위반한 불법프로그램의 제공 및 운영방해, 정보통신망
              이용촉진 및 정보보호 등에 관한 법률을 위반한 불법통신 및 해킹, 악성프로그램의 배포, 접속권한 초과행위 등과
              같이 관련 법령을 위반한 경우에는 즉시 영구이용정지를 할 수 있습니다. 본 항에 따른 영구이용정지 시
              Connectable 이용을 통해 획득한 기타 혜택 등도 모두 소멸되며, {"'회사'"}는 이에 대해 별도로 보상하지
              않습니다.
            </Text>
            <br />
            <br />
            <Text>
              ③ {"'회사'"}는 본 조의 이용제한 범위 내에서 제한의 조건 및 세부내용을 개별 운영정책으로 정할 수 있습니다.
            </Text>
            <br />
            <br />
            <Text>
              ④ {"'회원'"}은 본 조에 따른 이용제한 등에 대해 {"'회사'"}가 정한 절차에 따라 이의신청을 할 수 있습니다. 이
              때 이의가 정당하다고 {"'회사'"}가 인정하는 경우 {"'회사'"}는 즉시 Connectable의 이용을 재개합니다.
            </Text>
          </p>
          <hr className=" w-full bg-transparent border-b-[1px] border-slate-200 my-2" />
        </section>
        <section className="whitespace-pre-line">
          <h2 className="font-bold text-4">제16조 (회원에 대한 통지)</h2>
          <p className="text-sm leading-6 ">
            <br />
            <Text>
              ① 회사가 회원에 대하여 통지를 하는 경우 이 약관에 별도의 규정이 없는 한 회원이 제공한 전자우편주소 등으로
              할 수 있습니다.
            </Text>
            <br />
            <br />
            <Text>
              ② 회사는 회원 전체에 대하여 통지를 하는 경우 7일 이상 서비스 내 게시판에 게시함으로써 전항의 통지에 갈음할
              수 있습니다.
            </Text>
          </p>
          <hr className=" w-full bg-transparent border-b-[1px] border-slate-200 my-2" />
        </section>
        <section className="whitespace-pre-line">
          <h2 className="font-bold text-4">제17조 (책임 제한)</h2>
          <p className="text-sm leading-6 ">
            <br />
            <Text>
              ① 회사 또는 회원은 본 약관을 위반하여 상대방에게 손해를 입힌 경우에는 그 손해를 배상할 책임이 있습니다.
              다만, 행위자의 고의 또는 과실이 없는 경우에는 그러하지 아니합니다.
            </Text>
            <br />
            <br />
            <Text>
              ② 다음과 같은 사유로 회원에게 손해가 발생하였을 경우, 회사는 그 손해에 대하여 책임을 지지 아니합니다.
            </Text>
            <DotText>전시, 사변, 천재지변, 또는 이에 준하는 국가 비상사태 등 어쩔 수 없는 경우</DotText>
            <DotText>정부 기관의 사실상 또는 법률상 행정처분 및 명령 등에 대한 준수로 인한 경우</DotText>
            <DotText>전기통신사업법에 의한 기간통신사업자를 포함한 통신서비스 업체의 서비스 장애로 인한 경우</DotText>
            <DotText>
              회사가 관리할 수 없는 외주 시스템의 하자 또는 이용자 측 귀책 사유로 인하여 서비스에 장애가 발생한 경우
            </DotText>
            <DotText>순간적인 홈페이지 접속 증가, 일부 NFT의 주문 폭주 등으로 인한 서버의 장애가 발생한 경우</DotText>
            <DotText>
              서비스 내 판매 시스템, 전송 시스템, 각 NFT의 네트워크(예: 클레이튼 네트워크) 장애 또는 오류가 발생한 경우
            </DotText>
          </p>
          <hr className=" w-full bg-transparent border-b-[1px] border-slate-200 my-2" />
        </section>
        <section className="whitespace-pre-line">
          <h2 className="font-bold text-4">제18조 (대금 결제)</h2>
          <p className="text-sm leading-6 ">
            <br />
            <Text>
              ① NFT의 가격 등은 서비스 내 상점 등에서 표시된 가격에 의하나, 외화 결제 시 환율 및 수수료 등으로 인하여
              구매 시점의 예상 지급 금액과 실제 청구금액이 달라질 수 있습니다.
            </Text>
            <br />
            <br />
            <Text>② 회원은 서비스가 정하는 정책, 방법 등에 따라 결제금액을 내야 합니다.</Text>
          </p>
          <hr className=" w-full bg-transparent border-b-[1px] border-slate-200 my-2" />
        </section>
        <section className="whitespace-pre-line">
          <h2 className="font-bold text-4">제19조 (과오납금의 환불)</h2>
          <p className="text-sm leading-6 ">
            <br />
            <Text>① 회원이 과오납한 금액이 발생한 경우 환불이 이루어집니다.</Text>
            <br />
            <br />
            <Text>
              ② 환불은 회원이 결제한 방법과 같은 방법으로 환불하는 것을 원칙으로 하되, 같은 방법으로 환불이 불가능할
              때에는 다른 방법으로 환불할 수 있습니다.
            </Text>
            <br />
            <br />
            <Text>
              ③ 회원의 책임 있는 사유로 과오납금이 발생한 경우, 환불에 소요되는 수수료 등은 회원이 부담합니다.
            </Text>
            <br />
            <br />
            <Text>
              ④ 애플리케이션 다운로드 또는 네트워크 서비스를 이용하여 발생하는 요금(통화료, 데이터 통화료 등)은
              환불대상에서 제외됩니다.
            </Text>
          </p>
          <hr className=" w-full bg-transparent border-b-[1px] border-slate-200 my-2" />
        </section>
        <section className="whitespace-pre-line">
          <h2 className="font-bold text-4">제20조 (준거법 및 재판관활)</h2>
          <p className="text-sm leading-6 ">
            <br />
            <Text>① 회사와 회원간 발생한 분쟁에 대하여는 대한민국 법을 준거법으로 합니다.</Text>
            <br />
            <br />
            <Text>
              ② 회사와 회원간 발생한 분쟁에 관한 소송의 관할법원은 당사자들이 합의하여 결정하는 법원으로 하며 합의가
              이루어지지 않을 때에는 민사소송법에 의한 법원으로 합니다.
            </Text>
          </p>
        </section>
      </article>
      <Footer />
    </>
  );
}
