export type OrderCodeType = 'SOLD_OUT' | 'ALREDAY_PENDING' | 'FORM_ERROR' | 'TIMEOUT';

export const ORDER_CODE: { [key in OrderCodeType]: string } = {
  SOLD_OUT: '이미 판매가 완료된 티켓입니다.\n다시 시도해주세요.',
  ALREDAY_PENDING: '누군가 먼저 구매 폼을 제출했어요.\n다시 시도해주세요.',
  FORM_ERROR: '올바르지 않은 값이 있습니다.\n입력 값을 확인해주세요.',
  TIMEOUT: '판매시간이 경과되었어요.',
};
