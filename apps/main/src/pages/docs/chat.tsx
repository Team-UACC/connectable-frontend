import QRCode from 'qrcode.react';
import { useEffect } from 'react';

import { KAKAO_TALK_ONE_TO_ONE_CHAT } from '~/constants/link';

export default function Chat() {
  useEffect(() => {
    window.open(KAKAO_TALK_ONE_TO_ONE_CHAT, '_blank');
  }, []);

  return (
    <section className="absolute text-center -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 min-w-[320px]">
      <h1 className=" m-auto text-[2rem] font-bold ">1:1 문의하기</h1>
      <br />
      <br />
      <QRCode value={KAKAO_TALK_ONE_TO_ONE_CHAT} size={256} style={{ margin: 'auto' }} />
      <br />
      <br />
      <span className="font-bold ">자동으로 카카오톡으로 연결이 안 된다면,</span>
      <br />
      <span className="font-bold ">수동으로 스캔하여 카카오톡으로 진행해 주세요.</span>
    </section>
  );
}