import axios from 'axios';
import { Dispatch, SetStateAction } from 'react';

const isIOS = () => /iPhone|iPad|iPod/i.test(navigator.userAgent);
const isAndroid = () => /Android/i.test(navigator.userAgent);

const A2P_API_PREPARE_URL = 'https://a2a-api.klipwallet.com/v2/a2a/prepare';

export const getKlipAccessMethod = () => (isIOS() ? 'iOS' : isAndroid() ? 'android' : 'QR');

export const getKlipRequestKey = async () => {
  const res = await axios.post(A2P_API_PREPARE_URL, {
    bapp: {
      name: 'CONNECTABLE',
    },
    type: 'auth',
  });

  return res.data.request_key;
};

export const getKlipExecuteContractRequestKey = async ({
  txTo,
  functionJSON,
  value,
  params,
}: {
  txTo: string;
  functionJSON: string;
  value: string;
  params: string;
}) => {
  const res = await axios.post(A2P_API_PREPARE_URL, {
    bapp: {
      name: 'CONNECTABLE',
    },
    type: 'execute_contract',
    transaction: {
      to: txTo,
      abi: functionJSON,
      value: value,
      params: params,
    },
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

export const getKlipRequest = async (
  requestKey: string,
  method: 'QR' | 'iOS' | 'android',
  setQrvalue: Dispatch<SetStateAction<string>>
) => {
  if (method === 'QR') setQrvalue(() => getKlipAccessUrl('QR', requestKey));
  else if (method === 'iOS') window.location.href = getKlipAccessUrl('iOS', requestKey);
  else window.location.href = getKlipAccessUrl('android', requestKey); //

  return requestKey;
};

export const getSafeTransferFromRequestKey = async ({
  from,
  to,
  tokenId,
  contractAddress,
}: {
  from: string;
  to: string;
  tokenId: number;
  contractAddress: string;
}) => {
  const functionJSON =
    '{ "constant": false, "inputs": [ { "name": "from", "type": "address" }, { "name": "to", "type": "address" }, { "name": "tokenId", "type": "uint256" } ], "name": "safeTransferFrom", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }';

  const requestKey = await getKlipExecuteContractRequestKey({
    txTo: contractAddress,
    functionJSON,
    value: '0',
    // eslint-disable-next-line no-useless-escape
    params: `[\"${from}\", \"${to}\", \"${tokenId}\"]`,
  });

  return requestKey;
};

export const requestKlipResponse = async (
  requestKey: string
): Promise<{
  request_key: string;
  expiration_time: number;
  status: 'completed' | 'fail' | 'error';
  result: { tx_hash: string };
}> => {
  const response = await axios.get(`https://a2a-api.klipwallet.com/v2/a2a/result?request_key=${requestKey}`);

  const { data } = response;

  if (data.status === 'fail' || data.status === 'error') throw Error('트랜잭션에 실패했습니다.');

  return response.data;
};
