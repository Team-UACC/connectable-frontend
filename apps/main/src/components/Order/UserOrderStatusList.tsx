import { useQuery } from 'react-query';

import { fetchOrderStatusList } from '~/apis/orders';
import OrderStatusCard from '~/components/Card/OrderStatusCard';

export default function UserOrderStatusList() {
  const { data: orderList, isLoading } = useQuery(['userOrderStatusList'], fetchOrderStatusList, {
    cacheTime: 0,
    staleTime: 0,
  });

  if (isLoading) return <div>loading...</div>;

  return (
    <ul className="w-full divide-y-2 ">
      {orderList?.map(orderData => (
        <OrderStatusCard key={orderData.orderDetailId} orderData={orderData} />
      ))}
    </ul>
  );
}
