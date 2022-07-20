export default {
  tickets: {
    byEventId: (eventId: number) => ['ticketsByEventId', eventId],
    ownedByUser: ['ticketsOwnedByUser'],
    detailByIds: (eventId: number, tokenId: number) => ['ticketDetailByIds', eventId, tokenId],
  },
  events: { list: ['events'], byId: (eventId: number) => ['event', eventId] },
};
