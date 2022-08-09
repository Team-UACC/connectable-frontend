import Image from 'next/image';
import Link from 'next/link';
// eslint-disable-next-line import/no-named-as-default
import toast from 'react-hot-toast';

import { ACCOUNT } from '~/constants/company';
import { ORDER_STATUS_MESSAGE } from '~/constants/message';
import { OrderStatus, TicketOrderStatusType } from '~/types/orderType';
import { dayjsKO } from '~/utils/day';

import LinkToKlaytnScope from '../Text/LinkToKlaytnScope';

interface Props {
  orderData: TicketOrderStatusType;
  className?: string;
}

export default function OrderStatusCard({ orderData, className }: Props) {
  return (
    <article className={'relative w-full px-2 py-4  ' + className}>
      <Link href={`/tickets/${orderData.eventId}/${orderData.ticketId}`}>
        <a className="flex mb-6">
          <Image
            src={orderData.ticketMetadata.image}
            alt="티켓 이미지"
            width={50}
            height={50}
            layout="fixed"
            className="rounded-[10px] shadow-lg "
          />
          <div className="flex flex-col justify-between ml-8 h-[50px] text-start">
            <span className="text-sm font-semibold opacity-50">
              {dayjsKO(orderData.modifiedDate).format('YYYY-MM-DD (ddd) HH:mm')}
            </span>
            <span className="text-sm font-semibold">{orderData.ticketMetadata.name}</span>
          </div>
        </a>
      </Link>
      <OrderStatusText orderStatus={orderData.orderStatus} price={orderData.price} />
      {orderData.orderStatus === 'TRANSFER_SUCCESS' && (
        <div className="flex w-full mt-4">
          <span className="mr-8 text-sm font-semibold">TX_Hash</span>
          <div className="relative w-[60%]">
            <LinkToKlaytnScope type="tx" tx_hash={orderData.txHash}>
              {orderData.txHash}
            </LinkToKlaytnScope>
          </div>
        </div>
      )}
    </article>
  );
}

const OrderStatusText = ({ orderStatus, price }: { orderStatus: OrderStatus; price: number }) => {
  return (
    <>
      <span className={` font-semibold text-sm text-${[ORDER_STATUS_MESSAGE[orderStatus].color]} `}>
        {ORDER_STATUS_MESSAGE[orderStatus].message}
      </span>
      {orderStatus === 'REQUESTED' && (
        <div className="mt-4 text-sm font-bold text-red">
          <span
            className="underline cursor-pointer"
            onClick={() => {
              navigator.clipboard.writeText(`${ACCOUNT.FLAT_NUMBER} ${ACCOUNT.BANK}`);
              toast.success('클립보드에 복사되었습니다.');
            }}
          >
            {ACCOUNT.BANK} {ACCOUNT.NUMBERL} ({ACCOUNT.OWNER})
          </span>{' '}
          으로
          <br />
          {price.toLocaleString('ko-KR')}원을 입금해주세요.
        </div>
      )}
    </>
  );
};
