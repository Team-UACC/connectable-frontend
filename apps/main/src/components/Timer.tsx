import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

import { calculateRemaingTime } from '~/utils/index';

interface TimerProps {
  endTime: number;
  format?: string;
}

export default function Timer({ endTime, format = 'DD일 hh시간 mm분 ss초' }: TimerProps) {
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

  if (remaingTime === 0) return <>00일 00시간 00분 00초</>;

  return <>{dayjs(remaingTime).format(format)}</>;
}
