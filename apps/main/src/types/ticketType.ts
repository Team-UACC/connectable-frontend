export type TicketType = {
  price: number;
  artistName: string;
  eventDate: number;
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
