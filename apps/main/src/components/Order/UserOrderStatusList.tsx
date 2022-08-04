import OrderStatusCard from '~/components/Card/OrderStatusCard';
import { TicketOrderStatusType } from '~/types/orderType';

const orderList: Array<TicketOrderStatusType> = [
  {
    ticketId: 0,
    ticketSalesStatus: 'PENDING',
    ticketMetadata: {
      name: '밤 하늘의 별 #1',
      image: '/images/defaultProfile.png',
      description: 'wow',
    },
    orderId: 0,
    orderDetailId: 0,
    orderStatus: 'REQUESTED',
    modifiedDate: new Date(2022, 7, 4, 15, 33).getTime(),
    txHash: '0x00',
  },
  {
    ticketId: 0,
    ticketSalesStatus: 'PENDING',
    ticketMetadata: {
      name: '밤 하늘의 별 #1',
      image: '/images/defaultProfile.png',
      description: 'wow',
    },
    orderId: 0,
    orderDetailId: 0,
    orderStatus: 'PAID',
    modifiedDate: new Date(2022, 7, 4, 15, 33).getTime(),
    txHash: '0x00',
  },
  {
    ticketId: 0,
    ticketSalesStatus: 'PENDING',
    ticketMetadata: {
      name: '밤 하늘의 별 #1',
      image: '/images/defaultProfile.png',
      description: 'wow',
    },
    orderId: 0,
    orderDetailId: 0,
    orderStatus: 'UNPAID',
    modifiedDate: new Date(2022, 7, 4, 15, 33).getTime(),
    txHash: '0x00',
  },
  {
    ticketId: 0,
    ticketSalesStatus: 'PENDING',
    ticketMetadata: {
      name: '밤 하늘의 별 #1',
      image: '/images/defaultProfile.png',
      description: 'wow',
    },
    orderId: 0,
    orderDetailId: 0,
    orderStatus: 'REFUND',
    modifiedDate: new Date(2022, 7, 4, 15, 33).getTime(),
    txHash: '0x00',
  },
  {
    ticketId: 0,
    ticketSalesStatus: 'PENDING',
    ticketMetadata: {
      name: '밤 하늘의 별 #1',
      image: '/images/defaultProfile.png',
      description: 'wow',
    },
    orderId: 0,
    orderDetailId: 0,
    orderStatus: 'TRANSFER_SUCCESS',
    modifiedDate: new Date(2022, 7, 4, 15, 33).getTime(),
    txHash: '0x00',
  },
  {
    ticketId: 0,
    ticketSalesStatus: 'PENDING',
    ticketMetadata: {
      name: '밤 하늘의 별 #1',
      image: '/images/defaultProfile.png',
      description: 'wow',
    },
    orderId: 0,
    orderDetailId: 0,
    orderStatus: 'TRANSFER_FAIL',
    modifiedDate: new Date(2022, 7, 4, 15, 33).getTime(),
    txHash: '0x00',
  },
];

export default function UserOrderStatusList() {
  return (
    <ul className="w-full divide-y-2 ">
      {orderList?.map(orderData => (
        <>
          <OrderStatusCard orderData={orderData} />
        </>
      ))}
    </ul>
  );
}
