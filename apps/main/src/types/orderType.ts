import { TicketMetaData, TicketSalesStatus } from './ticketType';

export interface TicketOrderStatusType {
  ticketId: number;
  ticketSalesStatus: TicketSalesStatus;
  ticketMetadata: TicketMetaData;
  orderId: number;
  orderDetailId: number;
  orderStatus: OrderStatus;
  modifiedDate: number;
  txHash: string;
}

export type OrderStatus = 'REQUESTED' | 'PAID' | 'UNPAID' | 'REFUND' | 'TRANSFER_SUCCESS' | 'TRANSFER_FAIL';
