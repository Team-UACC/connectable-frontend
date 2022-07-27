import axios from 'axios';
import { Dispatch, SetStateAction } from 'react';
import toast from 'react-hot-toast';

import { getKlipAccessMethod, getKlipRequest, getSafeTransferFromRequestKey } from '~/utils/klip';

interface Props {
  requestKey: string;
  setQrvalue: Dispatch<SetStateAction<string>>;
}

export default function useKlip({ requestKey, setQrvalue }: Props) {
  const requestKlipTransaction = async () => {
    const method = getKlipAccessMethod();

    getKlipRequest(requestKey, method, setQrvalue);

    const timerId = setInterval(() => {
      axios.get(`https://a2a-api.klipwallet.com/v2/a2a/result?request_key=${requestKey}`).then(res => {
        const { status } = res.data;

        if (status === 'completed') {
          const { tx_hash } = res.data.result;
          toast.success(
            <div>
              트랜잭션에 성공하였습니다.
              <br />
              TX_hash
              <br />
              {tx_hash}
            </div>
          );
          return clearInterval(timerId);
        }
        if (status === 'fail' || status === 'error') {
          toast.error('트랜잭션에 실패했습니다.');
          return clearInterval(timerId);
        }
      });
    }, 1000);
  };

  return { requestKlipTransaction };
}
