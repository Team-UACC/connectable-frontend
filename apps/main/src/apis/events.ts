import { EventDetailType, EventSimpleType } from '~/types/eventType';
import { Ticket } from '~/types/ticketType';

import { axiosInstance } from '.';

export const fetchAllEvents = async (): Promise<Array<EventSimpleType>> => {
  return axiosInstance.get(`/events`);
};

export const fetchEventsAllTickets = async (eventId: number): Promise<Array<Ticket>> => {
  return axiosInstance.get(`/events/${eventId}/tickets`);
};

export const fetchEventsDetail = async (eventId: number): Promise<EventDetailType> => {
  return axiosInstance.get(`/events/${eventId}`);
};

export const fetchTicketsDetail = async (eventId: number, ticketId: number): Promise<Ticket> => {
  return axiosInstance.get(`/events/${eventId}/tickets/${ticketId}`);
};
