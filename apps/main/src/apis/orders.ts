import { Axios } from 'axios';

import { OrderCodeType } from '~/constants/error';

const orderAxios = new Axios({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/orders`,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
  },
  timeout: 3000,
});

export const postOrderForm = async ({
  userName,
  phoneNumber,
  ticketIdList,
}: {
  userName: string;
  phoneNumber: string;
  ticketIdList: Array<number>;
}): Promise<{ status: 'success' } | { status: 'failed'; code: OrderCodeType }> => {
  const response = await orderAxios.post(`/orders`, JSON.stringify({ userName, phoneNumber, ticketId: ticketIdList }));

  return response.data;
};
