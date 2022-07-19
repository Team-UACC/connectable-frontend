import { useState } from 'react';

import Text from '~/components/Text';
import Timer from '~/components/Timer';

interface Props {
  endTime: number;
}

export default function EventSaleTimer({ endTime }: Props) {
  const [finish, setFinish] = useState(false);
  return (
    <Text weight="semibold" className=" opacity-70">
      {finish ? (
        <>판매가 종료된 컬렉션입니다.</>
      ) : (
        <>
          판매 종료까지{' '}
          <span className="text-blue-500 ">
            <Timer endTime={endTime} setFinish={setFinish} />
          </span>{' '}
          남았습니다.
        </>
      )}
    </Text>
  );
}
