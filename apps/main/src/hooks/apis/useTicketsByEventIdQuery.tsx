import { AxiosError } from 'axios';
import { useQuery, UseQueryOptions } from 'react-query';

import { fetchEventsAllTickets } from '~/apis/events';
import queryKeys from '~/constants/queryKeys';
import { TicketType } from '~/types/ticketType';

export default function useTicketsByEventIdQuery(
  eventId: number,
  options?: Omit<UseQueryOptions<TicketType[], AxiosError>, 'queryKey' | 'queryFn'>
) {
  return useQuery(queryKeys.tickets.byEventId(eventId), () => fetchEventsAllTickets(eventId), options);
}
