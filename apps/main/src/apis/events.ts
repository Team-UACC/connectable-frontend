import { Axios } from 'axios';

import { EventDetailType, EventSimpleType } from '~/types/eventType';

const eventAxios = new Axios({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/events`,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
  },
  timeout: 3000,
});

export type GetEventRes = Array<EventSimpleType>;

export const getEvents = async (): Promise<GetEventRes> => {
  const response = await eventAxios.get(``);

  return JSON.parse(response.data);
};

export const getEventsDetail = async (eventId: string): Promise<EventDetailType> => {
  const response = await eventAxios.get(`/${eventId}`);

  return JSON.parse(response.data);
};
