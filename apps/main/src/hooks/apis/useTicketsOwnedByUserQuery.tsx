import { AxiosError } from 'axios';
import { useQuery, UseQueryOptions } from 'react-query';

import { fetchTicketsOwnedByUser } from '~/apis/users';
import queryKeys from '~/constants/queryKeys';
import { Ticket } from '~/types/ticketType';

export default function useTicketsOwnedByUserQuery(
  options?: Omit<UseQueryOptions<Ticket[], AxiosError>, 'queryKey' | 'queryFn'>
) {
  return useQuery(queryKeys.tickets.ownedByUser, fetchTicketsOwnedByUser, options);
}
