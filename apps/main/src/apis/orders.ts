import { Axios } from 'axios';
import { getCookie } from 'cookies-next';

import { OrderCodeType, ORDER_CODE } from '~/constants/error';

const authorizationOptions = () => ({
  headers: {
    Authorization: `Bearer ${getCookie('auth')}`,
  },
});

const orderAxios = new Axios({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/orders`,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
  },
  timeout: 5000,
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
  const response = await orderAxios.post(
    ``,
    JSON.stringify({ userName, phoneNumber, ticketId: ticketIdList }),
    authorizationOptions()
  );

  const { data } = response;

  const { status } = data;

  if (status === 'success') {
    return response.data;
  } else if (status === 'failed') {
    const { code }: { code: OrderCodeType } = data;
    throw Error(ORDER_CODE[code]);
  } else {
    throw Error('에러가 발생했습니다.\n문의를 남겨주세요.');
  }
};
