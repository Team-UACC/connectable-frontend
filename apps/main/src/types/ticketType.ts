export type TicketType = {
  price: number;
  artistName: string;
  eventDate: Date;
  eventName: string;
  onSale: boolean;
  tokenId: number;
  tokenURI: string;
  contractAddress: string;
  metadata: {
    name: string;
    description: string;
    image: string;
    attributes: Array<{ trait_type: string; value: string }>;
  };
};
