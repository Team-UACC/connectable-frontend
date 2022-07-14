import QRCode from 'qrcode.react';

import { useKlipLogin } from '~/hooks/useAuth';

import Spinner from '../Spinner';

export default function KlipAuth() {
  const [method, qrvalue] = useKlipLogin();

  if (method === 'QR')
    return (
      <div>
        {qrvalue === 'DEFAULT' ? (
          <div className=" w-[16rem] h-[16rem] flex flex-col justify-center ml-[10rem]">
            <Spinner />
          </div>
        ) : (
          <QRCode value={qrvalue} size={256} style={{ margin: 'auto' }} />
        )}
        <br />
        <br />
        <span className="font-bold ">휴대폰으로 스캔하여 Klip 로그인을 진행해 주세요.</span>
        <br />
        <br />
        <a
          className="font-bold text-blue-500 underline "
          href="https://klipwallet.com/"
          target="_blank"
          rel="noreferrer"
        >
          Klip이란?
        </a>
      </div>
    );
  else return <span className="font-bold">카카오톡으로 이동해서 로그인을 완료하세요.</span>;
}
