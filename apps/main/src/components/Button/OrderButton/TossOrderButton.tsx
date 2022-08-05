import { loadTossPayments, TossPaymentsInstance } from '@tosspayments/payment-sdk';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
// eslint-disable-next-line import/no-named-as-default
import toast from 'react-hot-toast';

import Button from '~/components/Button';
import LoginRequestToast from '~/components/Toast/LoginRequestToast';
import { useUserStore } from '~/stores/user';

interface Props {
  amount: number;
  orderName: string;
}

export default function OrderButton({ amount, orderName }: Props) {
  const { isLoggedIn } = useUserStore();

  const [tossPayments, setTossPayment] = useState<TossPaymentsInstance>();

  const router = useRouter();
  const { eventId } = router.query;

  useEffect(() => {
    (async () => {
      const testClientKey = process.env.NEXT_PUBLIC_TOSS_TEST_CLIENT_KEY;
      if (!testClientKey) return;
      const _tossPayments = await loadTossPayments(testClientKey);
      setTossPayment(_tossPayments);
    })();
  }, []);

  const handleTransfer = (tossPayments: TossPaymentsInstance) => {
    tossPayments.requestPayment('계좌이체', {
      amount,
      orderId: 'QhVBczmUBer1Oq6fjjxld',
      orderName,
      successUrl: `${process.env.NEXT_PUBLIC_ORDER_REDIRECT_URL}/events/${eventId}/order/success`,
      failUrl: `${process.env.NEXT_PUBLIC_ORDER_REDIRECT_URL}/events/${eventId}/order/fail`,
    });
  };

  return (
    <Button
      onClick={() => {
        if (isLoggedIn) {
          if (!tossPayments) return toast.error('오류가 발생했습니다. 다시 시도해 주세요.');
          handleTransfer(tossPayments);
        } else {
          toast.error(<LoginRequestToast />, { icon: null });
        }
      }}
    >
      구매하기
    </Button>
  );
}
