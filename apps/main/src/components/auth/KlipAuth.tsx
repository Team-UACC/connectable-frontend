import { setCookie } from 'cookies-next';
import QRCode from 'qrcode.react';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { postUserLogin } from '~/apis/users';
import { useModalStore } from '~/stores/modal';
import { useUserStore } from '~/stores/user';
import { getKlipAccessMethod, getKlipAccessUrl, getKlipRequestKey } from '~/utils/klip';

import Spinner from '../Spinner';

import SingUpForm from './SignUpForm';

export default function KlipAuth() {
  const [method, qrvalue] = useKlipAuth();

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
      </div>
    );
  else return <span className="font-bold">카카오톡으로 이동해서 로그인을 완료하세요.</span>;
}

const getKlipRequest = async (method: 'QR' | 'iOS' | 'android', setQrvalue: Dispatch<SetStateAction<string>>) => {
  const requestKey = await getKlipRequestKey();

  if (method === 'QR') setQrvalue(() => getKlipAccessUrl('QR', requestKey));
  else if (method === 'iOS') window.location.href = getKlipAccessUrl('iOS', requestKey);
  else window.location.href = getKlipAccessUrl('android', requestKey); //

  return requestKey;
};

const useKlipAuth = () => {
  const method = getKlipAccessMethod();

  const [qrvalue, setQrvalue] = useState('DEFAULT');
  const { setKlaytnAddress, setIsLoggedIn } = useUserStore();
  const { showModal } = useModalStore();

  useEffect(() => {
    let intervalId: NodeJS.Timer;

    (async () => {
      const requestKey = await getKlipRequest(method, setQrvalue);

      intervalId = setInterval(async () => {
        const { status, klaytnAddress, jwt, isNew } = await postUserLogin(requestKey);

        if (status === 'completed') {
          setCookie('auth', jwt, { maxAge: 60 * 24, httpOnly: true, secure: true, sameSite: 'strict' });

          if (isNew) {
            setKlaytnAddress(klaytnAddress as string);
            showModal('Sign Up', <SingUpForm />);
          } else {
            setIsLoggedIn(true);
          }
          clearInterval(intervalId);
        }
      }, 1000);
    })();

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return [method, qrvalue];
};
