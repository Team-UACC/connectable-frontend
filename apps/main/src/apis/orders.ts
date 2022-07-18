import axios, { Axios } from 'axios';

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
  agreement,
  numberOfPeople,
}: {
  userName: string;
  phoneNumber: string;
  agreement: boolean;
  numberOfPeople: number;
}) => {
  const response = await axios.post(
    `/api/orders`,
    { userName, phoneNumber, agreement, numberOfPeople },
    {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    }
  );

  return response.data;
};
