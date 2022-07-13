import { useEffect, useState } from 'react';

import { timeFormatter } from '~/utils/day';
import { calculateRemaingTime } from '~/utils/index';

interface Props {
  endTime: number;
}

export default function Timer({ endTime }: Props) {
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

  return <>{timeFormatter(remaingTime)}</>;
}
