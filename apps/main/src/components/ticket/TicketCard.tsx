import { GetUserTicketRes } from '~/apis/users';

export default function TicketCard({ data }: { data: GetUserTicketRes }) {
  return <article>{JSON.stringify(data)}</article>;
}
