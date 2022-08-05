import { OrderStatus } from '~/types/orderType';

export const ORDER_STATUS_MESSAGE: {
  [key in OrderStatus]: {
    color: string;
    message: string;
  };
} = {
  REQUESTED: {
    color: '',
    message: 'Connectable에서 입금 내역을 검토하고 있습니다.',
  },
  PAID: {
    color: 'green',
    message: '입금 내역 검토가 완료되었습니다. \n잠시후 티켓이 전송됩니다.',
  },
  UNPAID: {
    color: '',
    message: '미입금으로 취소되었습니다.\n문의가 있으면 1:1채팅으로 문의주세요.',
  },
  REFUND: {
    color: '',
    message: '중복 구매 또는 판매자 사정으로 인하여 환불처리 되었습니다.',
  },
  TRANSFER_SUCCESS: {
    color: `green`,
    message: 'NFT 전송이 완료되었습니다.\n마이티켓에서 확인해주세요.',
  },
  TRANSFER_FAIL: {
    color: '',
    message: 'NFT 전송에 실패했습니다.\n실패가 지속된다면 1:1 문의하기를 이용해주세요.',
  },
};
