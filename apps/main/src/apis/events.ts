import { Axios } from 'axios';

const eventAxios = new Axios({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/events`,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
  },
  timeout: 1000,
});

export type GetEventRes = Array<{
  id: number;
  name: string;
  image: string;
  date: number;
  description: string;
  salesFrom: number;
  salesTo: number;
}>;

export const getEvents = async (): Promise<GetEventRes> => {
  const response = await eventAxios.get(``);

  return JSON.parse(response.data);
};
