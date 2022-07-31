import { Axios } from 'axios';

import { EventDetailType, EventSimpleType } from '~/types/eventType';
import { Ticket } from '~/types/ticketType';

const eventAxios = new Axios({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/events`,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
  },
  timeout: 5000,
});

export const fetchAllEvents = async (): Promise<Array<EventSimpleType>> => {
  const response = await eventAxios.get(``);

  return JSON.parse(response.data);
};

export const fetchEventsAllTickets = async (eventId: number): Promise<Array<Ticket>> => {
  const response = await eventAxios.get(`/${eventId}/tickets`);

  return JSON.parse(response.data);
};

export const fetchEventsDetail = async (eventId: number): Promise<EventDetailType> => {
  const response = await eventAxios.get(`/${eventId}`);

  return JSON.parse(response.data);
};

export const fetchTicketsDetail = async (eventId: number, ticketId: number): Promise<Ticket> => {
  const response = await eventAxios.get(`/${eventId}/tickets/${ticketId}`);

  if (response.status === 400) throw Error(JSON.parse(response.data).message);

  return JSON.parse(response.data);
};
