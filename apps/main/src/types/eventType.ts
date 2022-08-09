export type EventSimpleType = {
  id: number;
  name: string;
  image: string;
  date: number;
  description: string;
  salesFrom: number;
  salesTo: number;
};

export interface EventDetailType {
  id: number;
  name: string;
  image: string;
  artistName: string;
  artistImage: string;
  date: number;
  description: string;
  salesFrom: number;
  salesTo: number;
  twitterUrl: string;
  instagramUrl: string;
  webpageUrl: string;
  totalTicketCount: number;
  onSaleTicketCount: number;
  startTime: number;
  endTime: number;
  price: number;
  location: string;
  salesOption: 'FLAT_PRICE' | 'FLEXIBLE_PRICE'; // FLAT_PRICE(균일가), FLEXIBLE_PRICE(균일가 아님)
  contractAddress: string;
  openseaUrl: string;
}
