import { AxiosError } from 'axios';
import { useQuery, UseQueryOptions } from 'react-query';

import { fetchAllEvents } from '~/apis/events';
import queryKeys from '~/constants/queryKeys';
import { EventSimpleType } from '~/types/eventType';

export default function useEventsQuery(
  options?: Omit<UseQueryOptions<EventSimpleType[], AxiosError>, 'queryKey' | 'queryFn'>
) {
  return useQuery(queryKeys.events.list, fetchAllEvents, options);
}
