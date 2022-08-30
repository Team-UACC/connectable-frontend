import QRCode from 'qrcode.react';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';

import { requestEntranceVerification } from '~/apis/users';
import { timeFormatterForMinute } from '~/utils/day';

interface Props {
  ticketId: number;
}

const DURATION = 30;

export default function QREntranceForm({ ticketId }: Props) {
  const [qrvalue, setQrvalue] = useState('DEFAULT');
  const [remainingTime, setRemainingTime] = useState(0);

  const { isLoading, isError } = useQuery(
    ['fetchEntranceVerification', ticketId],
    () => requestEntranceVerification({ ticketId }),
    {
      onSuccess: data => {
        setRemainingTime(DURATION);
        setQrvalue(JSON.stringify(data));
      },
      refetchInterval: DURATION * 1000,
      staleTime: 0,
      cacheTime: 0,
    }
  );

  useEffect(() => {
    const id = setInterval(() => {
      setRemainingTime(time => time - 1);
    }, 1000);

    return () => {
      clearInterval(id);
    };
  }, [remainingTime]);

  if (isLoading || qrvalue === 'DEFAULT') {
    return <span className="font-bold">loading...</span>;
  }

  if (isError) {
    return <span className="font-bold">다시 시도해주세요</span>;
  }

  return (
    <div>
      <QRCode value={qrvalue} size={256} style={{ margin: 'auto' }} />
      <br />
      <span className="font-bold text-red ">남은 시간 {timeFormatterForMinute(remainingTime * 1000)}</span>
      <br />
      <br />
      <span className="font-bold ">입장을 위해서 준비해주세요.</span>
    </div>
  );
}
