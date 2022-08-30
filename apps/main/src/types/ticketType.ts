export interface Ticket extends TicketSimple {
  eventId: number;
  contractAddress: string;
  ownedBy: string;
  isUsed: boolean;
}

export interface TicketSimple {
  id: number;
  price: number;
  artistName: string;
  eventDate: number;
  eventName: string;
  ticketSalesStatus: TicketSalesStatus;
  tokenId: number;
  tokenURI: string;
  metadata: TicketMetaData;
}

export type TicketSalesStatus = 'SOLD_OUT' | 'PENDING' | 'ON_SALE';

export interface TicketMetaData {
  name: string;
  description: string;
  image: string;
}
