import { Dispatch, SetStateAction, useEffect, useState } from 'react';

// import { timeFormatter } from '~/utils/day';
import { calculateRemaingTime } from '~/utils/index';

interface Props {
  endTime: number;
  setFinish: Dispatch<SetStateAction<boolean>>;
}

export default function useTimer({ endTime, setFinish }: Props) {
  const [loading, setLoading] = useState(true);
  const [remaingTime, setRemaingTime] = useState(0);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setRemaingTime(calculateRemaingTime(endTime));
    }, 1000);

    if (remaingTime < 0) {
      clearTimeout(timerId);
    }

    return () => {
      clearTimeout(timerId);
    };
  });

  useEffect(() => {
    if (loading) {
      remaingTime > 0 && setLoading(false);
    }
    if (remaingTime < 0) {
      setFinish(true);
    }
  }, [remaingTime]);

  return { loading, remaingTime };
}
