import { AxiosError } from 'axios';
import { QueryClient, useQuery, UseQueryOptions } from 'react-query';

import { fetchEventsAllTickets } from '~/apis/events';
import queryKeys from '~/constants/queryKeys';
import { Ticket } from '~/types/ticketType';

export default function useTicketsByEventIdQuery(
  eventId: number,
  options?: Omit<UseQueryOptions<Ticket[], AxiosError>, 'queryKey' | 'queryFn'>
) {
  return useQuery(queryKeys.tickets.byEventId(eventId), () => fetchEventsAllTickets(eventId), options);
}

export function prefetchTicketsByEventIdQuery(
  queryClient: QueryClient,
  eventId: number,
  options?: Omit<UseQueryOptions<Ticket[], AxiosError>, 'queryKey' | 'queryFn'>
) {
  return queryClient.prefetchQuery(queryKeys.tickets.byEventId(eventId), () => fetchEventsAllTickets(eventId), options);
}
