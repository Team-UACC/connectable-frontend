import axios from 'axios';
import { Dispatch, SetStateAction, useState } from 'react';
import toast from 'react-hot-toast';
import { useQuery } from 'react-query';

import { getKlipAccessMethod, getKlipRequest } from '~/utils/klip';

interface Props {
  onSettled?: () => void;
}

const requestKlipResponse = async (requestKey: string) => {
  const response = await axios.get(`https://a2a-api.klipwallet.com/v2/a2a/result?request_key=${requestKey}`);

  return response.data;
};

export default function useKlip({ onSettled }: Props) {
  const method = getKlipAccessMethod();

  const [requestKey, setRequestKey] = useState('');
  const [refetchInterval, setRefetchInterval] = useState(1000);

  useQuery(['klip', { requestKey }], () => requestKlipResponse(requestKey), {
    onSuccess: data => {
      const { status } = data;

      if (status === 'completed') {
        const { tx_hash } = data.result;
        toast.success(
          <div>
            트랜잭션에 성공하였습니다.
            <br />
            TX_hash
            <br />
            {tx_hash}
          </div>
        );
        setRefetchInterval(0);
        onSettled && onSettled();
      }
      if (status === 'fail' || status === 'error') {
        toast.error('트랜잭션에 실패했습니다.');
        setRefetchInterval(0);
        onSettled && onSettled();
      }
    },
    refetchInterval,
  });

  const requestKlipTransaction = async ({
    requestKey,
    setQrvalue,
  }: {
    requestKey: string;
    setQrvalue: Dispatch<SetStateAction<string>>;
  }) => {
    setRequestKey(requestKey);
    getKlipRequest(requestKey, method, setQrvalue);
  };

  return { requestKlipTransaction };
}
