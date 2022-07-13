import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

import { calculateRemaingTime } from '~/utils/index';

interface Props {
  endTime: number;
  format?: string;
}

export default function Timer({ endTime, format = 'DD일 hh시간 mm분 ss초' }: Props) {
  const [finish, setFinish] = useState(false);

  const [remaingTime, setRemaingTime] = useState(0);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setRemaingTime(calculateRemaingTime(endTime));
    }, 1000);

    return () => {
      clearTimeout(timerId);
    };
  });

  useEffect(() => {
    if (remaingTime <= 0) {
      setFinish(true);
    }
  }, [remaingTime]);

  if (remaingTime === 0) return <>...</>;

  return <>{dayjs(remaingTime).format(format)}</>;
}
