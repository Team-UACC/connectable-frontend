import KlipQR from '~/components/Klip/KlipQR';
import Spinner from '~/components/Spinner';
import { useKlipLogin } from '~/hooks/useAuth';

export default function KlipAuth() {
  const [method, qrvalue] = useKlipLogin();

  if (method === 'QR')
    return (
      <div>
        {qrvalue === 'DEFAULT' ? (
          <div className=" h-[16rem] flex flex-col justify-center ml-[10rem]">
            <Spinner />
          </div>
        ) : (
          <KlipQR qrvalue={qrvalue} />
        )}
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
