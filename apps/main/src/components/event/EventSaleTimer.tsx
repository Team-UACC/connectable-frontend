import Timer from '../Timer';

interface EventSaleTimerProps {
  endTime: number;
}

export default function EventSaleTimer({ endTime }: EventSaleTimerProps) {
  return (
    <span className="text-sm font-semibold opacity-70 ">
      판매 종료까지{' '}
      <span className=" text-red">
        <Timer endTime={endTime} />
      </span>{' '}
      남았습니다.
    </span>
  );
}
