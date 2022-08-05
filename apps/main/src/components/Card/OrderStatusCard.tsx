import Image from 'next/image';

import { ORDER_STATUS_MESSAGE } from '~/constants/message';
import { OrderStatus, TicketOrderStatusType } from '~/types/orderType';
import { dayjsKO } from '~/utils/day';

import LinkToKlaytnScope from '../LinkToKlaytnScope';
import Text from '../Text';

interface Props {
  orderData: TicketOrderStatusType;
  className?: string;
}

export default function OrderStatusCard({ orderData, className }: Props) {
  return (
    <article className={'relative w-full px-2 py-4  ' + className}>
      <div className="flex mb-6 ">
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
      </div>
      <OrderStatusText orderStatus={orderData.orderStatus} />
      <br />
      <br />
      {orderData.orderStatus === 'TRANSFER_SUCCESS' && (
        <div className="flex w-full">
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

const OrderStatusText = ({ orderStatus }: { orderStatus: OrderStatus }) => {
  return (
    <span className={` font-semibold text-sm text-${[ORDER_STATUS_MESSAGE[orderStatus].color]} `}>
      {ORDER_STATUS_MESSAGE[orderStatus].message}
    </span>
  );
};
