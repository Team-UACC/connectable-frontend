import { useQuery } from 'react-query';

import { getUserTicket } from '~/apis/users';

import TicketCard from './TicketCard';

export default function UserTicketCardList() {
  const { data } = useQuery('userTicket', getUserTicket);

  return <article>{JSON.stringify(data)}</article>;
}
