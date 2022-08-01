import { Dispatch, SetStateAction, useState } from 'react';
// eslint-disable-next-line import/no-named-as-default
import toast from 'react-hot-toast';
import { useQuery } from 'react-query';

import OnSuccessTransaction from '~/components/Toast/OnSuccessTransaction';
import { getKlipAccessMethod, getKlipRequest, requestKlipResponse } from '~/utils/klip';

/*
  klip을 통해서 transaction을 요청할 수 있는 함수를 return

  props로 transaction이 성공 혹은 실패했을 때의 공통 작업(onSettled)을 넘겨받음
  
  사용할 컴포넌트에서 transaction requestKey와 사용자에게 보여줄 QR 코드의 set 함수를 넘겨주어서 사용

*/

interface Props {
  onSettled: () => void;
}

export default function useKlip({ onSettled }: Props) {
  const method = getKlipAccessMethod();

  const [requestKey, setRequestKey] = useState('');
  const [refetchInterval, setRefetchInterval] = useState(0);

  useQuery(['klip', { requestKey }], () => requestKlipResponse(requestKey), {
    onSuccess: data => {
      const { status } = data;

      if (status === 'completed') {
        const { tx_hash } = data.result;
        toast.success(<OnSuccessTransaction tx_hash={tx_hash} />);

        setRefetchInterval(0);
        onSettled();
      } else if (status === 'fail' || status === 'error') {
        toast.error('트랜잭션에 실패했습니다.');

        setRefetchInterval(0);
        onSettled();
      }
    },
    refetchInterval,
    enabled: refetchInterval > 0,
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
    setRefetchInterval(1000);
  };

  return { requestKlipTransaction };
}
