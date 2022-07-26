export interface Ticket extends TicketSimple {
  eventId: number;
  contractAddress: string;
  ownedBy: string;
}

export interface TicketSimple {
  id: number;
  price: number;
  artistName: string;
  eventDate: number;
  eventName: string;
  ticketSalesStatus: 'SOLD_OUT' | 'PENDING' | 'ON_SALE';
  tokenId: number;
  tokenURI: string;
  metadata: {
    name: string;
    description: string;
    image: string;
  };
}
