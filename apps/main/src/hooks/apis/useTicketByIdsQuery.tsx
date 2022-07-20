import { AxiosError } from 'axios';
import { useQuery, UseQueryOptions } from 'react-query';

import { fetchTicketsDetail } from '~/apis/events';
import queryKeys from '~/constants/queryKeys';
import { TicketType } from '~/types/ticketType';

export default function useTicketByIdsQuery(
  eventId: number,
  tokenId: number,
  options?: Omit<UseQueryOptions<TicketType, AxiosError>, 'queryKey' | 'queryFn'>
) {
  return useQuery(queryKeys.tickets.detailByIds(eventId, tokenId), () => fetchTicketsDetail(eventId, tokenId), options);
}
