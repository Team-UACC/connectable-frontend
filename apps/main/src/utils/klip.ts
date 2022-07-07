import axios from 'axios';

const isIOS = () => /iPhone|iPad|iPod/i.test(navigator.userAgent);
const isAndroid = () => /Android/i.test(navigator.userAgent);

export const getKlipAccessMethod = () => (isIOS() ? 'iOS' : isAndroid() ? 'android' : 'QR');

export const getKlipRequestKey = async () => {
  const res = await axios.post('https://a2a-api.klipwallet.com/v2/a2a/prepare', {
    bapp: {
      name: 'CONNECTABLE',
    },
    type: 'auth',
  });

  return res.data.request_key;
};

export const getKlipAccessUrl = (method: 'QR' | 'iOS' | 'android', request_key: string) => {
  switch (method) {
    case 'QR':
      return `https://klipwallet.com/?target=/a2a?request_key=${request_key}`;
    case 'iOS':
      return `kakaotalk://klipwallet/open?url=https://klipwallet.com/?target=/a2a?request_key=${request_key}`;
    case 'android':
      return `intent://klipwallet/open?url=https://klipwallet.com/?target=/a2a?request_key=${request_key}#Intent;scheme=kakaotalk;package=com.kakao.talk;end`;
    default:
      return `kakaotalk://klipwallet/open?url=https://klipwallet.com/?target=/a2a?request_key=${request_key}`;
  }
};