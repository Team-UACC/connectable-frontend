import { OrderCodeType, ORDER_CODE } from '~/constants/error';

import { authorizationOptions, axiosInstance } from '.';

type PostOrderFormRes = { status: 'success' } | { status: 'failed'; code: OrderCodeType };

export const postOrderForm = async ({
  userName,
  phoneNumber,
  ticketIdList,
}: {
  userName: string;
  phoneNumber: string;
  ticketIdList: Array<number>;
}): Promise<PostOrderFormRes> => {
  const data: PostOrderFormRes = await axiosInstance.post(
    `/orders`,
    JSON.stringify({ userName, phoneNumber, ticketIds: ticketIdList }),
    authorizationOptions()
  );

  const { status } = data;

  if (status === 'success') {
    return data;
  } else if (status === 'failed') {
    const { code }: { code: OrderCodeType } = data;
    throw Error(ORDER_CODE[code]);
  } else {
    throw Error('에러가 발생했습니다.\n문의를 남겨주세요.');
  }
};
