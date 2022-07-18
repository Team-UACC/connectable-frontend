import Text from '~/components/Text';
import Timer from '~/components/Timer';

interface Props {
  endTime: number;
}

export default function EventSaleTimer({ endTime }: Props) {
  return (
    <Text weight="semibold" className=" opacity-70">
      판매 종료까지{' '}
      <span className="text-blue-500 ">
        <Timer endTime={endTime} />
      </span>{' '}
      남았습니다.
    </Text>
  );
}
