import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';

import Button from '~/components/Button';
import FormOrderButton from '~/components/Button/OrderButton/FormOrderButton';
import { PriceText } from '~/components/Events/EventInfo';
import EventSaleTimer from '~/components/Events/EventSaleTimer';
import LinkToKlaytnScope from '~/components/Text/LinkToKlaytnScope';
import TextInfo from '~/components/Text/TextInfo';
import useEventByIdQuery from '~/hooks/apis/useEventByIdQuery';
import useTicketByIdsQuery from '~/hooks/apis/useTicketByIdsQuery';
import useScrollToTop from '~/hooks/useScrollToTop';
import { dayjsKO } from '~/utils/day';

interface Props {
  eventId: number;
  ticketId: number;
}

export default function TicketDetailForm({ eventId, ticketId }: Props) {
  const { data: ticketDetail, isLoading: ticketDetailLoading } = useTicketByIdsQuery(eventId, ticketId, {
    staleTime: 0,
    cacheTime: 0,
  });

  const { data: eventDetail, isLoading: eventDetailLoading } = useEventByIdQuery(eventId, {
    staleTime: 0,
    cacheTime: 0,
  });

  const containterRef = useRef(null);

  useScrollToTop(containterRef);

  if (ticketDetailLoading || eventDetailLoading) {
    return <span>loading...</span>;
  }

  if (!ticketDetail || !eventDetail) {
    return <span>알 수 없는 에러가 발생했습니다. 다시 시도해 주세요.</span>;
  }

  return (
    <article ref={containterRef} className="w-full scale-90 -translate-y-[5rem] text-start">
      <h1 className="mb-4 text-xl font-bold text-center">{ticketDetail.metadata.name} 상세정보</h1>
      <div className=" relative w-[calc(100%+2rem)] p-4 -translate-x-4 bg-gray-100 ">
        <div className="m-2 max-w-fit drop-shadow-2xl">
          <Image
            src={ticketDetail.metadata.image}
            width={388}
            height={388}
            objectFit="cover"
            className="rounded-[10px] "
          />
        </div>
      </div>
      <h1 className="px-2 py-4 mt-2 text-lg font-bold">{ticketDetail.metadata.name}</h1>
      {ticketDetail.ticketSalesStatus === 'ON_SALE' && (
        <div className="px-2">
          <div className="mb-2 text-sm font-bold text-red">아직 판매되지 않은 티켓입니다.</div>
          <EventSaleTimer endTime={eventDetail.salesTo} />
          <div className="flex justify-between mt-2">
            <div />
            <PriceText>{`${eventDetail.price.toLocaleString('ko-KR')}원`}</PriceText>
          </div>
        </div>
      )}
      {ticketDetail.ticketSalesStatus === 'PENDING' && (
        <div className="px-2">
          <div className="mb-2 text-sm font-bold text-red">누군가 구매 승인을 대기하고 있는 티켓입니다.</div>
          <EventSaleTimer endTime={eventDetail.salesTo} />
          <div className="flex justify-between mt-2">
            <div />
            <PriceText>{`${eventDetail.price.toLocaleString('ko-KR')}원`}</PriceText>
          </div>
        </div>
      )}
      <TextInfo
        title="공연정보"
        contents={[
          { term: '장소', description: eventDetail.location },
          { term: '공연 일시', description: dayjsKO(eventDetail.startTime).format('YYYY.MM.DD (ddd) A hh시 mm분') },
          { term: '공연 시간', description: `${(eventDetail.endTime - eventDetail.startTime) / 1000 / 60}분` },
        ]}
      />
      <TextInfo.Simple title={`공연 설명`}>{eventDetail.description}</TextInfo.Simple>
      <TextInfo
        title="NFT 티켓 정보"
        contents={[
          { term: '혜택1', description: '조엘 겨울 콘서트 화이트리스트 제공' },
          { term: '혜택2', description: 'NFT 티켓 소유자 중 추첨을 통해 공연 후 포토타임 제공' },
        ]}
      />
      <TextInfo
        title="기타 안내"
        contents={[
          { term: '티켓 사용법', description: '공연 입장 전, 마이페이지에서 본인의 티켓을 보여주세요.' },
          {
            term: '안내사항1',
            description:
              '공연 입장 시간에 맞추어 공연장 입구 및 계단에서 개인 정보 확인 후 입장을 도와드릴 예정입니다.',
          },
          {
            term: '안내사항2',
            description: '예매 폼 제출 순으로 입장합니다.',
          },
          {
            term: '안내사항3',
            description: '공연장 내 좌석은 모두 자유석입니다.',
          },
          {
            term: '안내사항4',
            description:
              '취소 문의는 010-5248-4170으로 공연명, 성함, 계좌번호를 보내주시면 순차적으로 처리해드리겠습니다.',
          },
        ]}
      />
      <TextInfo
        title="NFT 상세"
        contents={[
          { term: 'Owned By', description: ticketDetail.ownedBy, hasCopy: true },
          {
            term: 'Contract Address',
            description: (
              <LinkToKlaytnScope type="account" account={eventDetail.contractAddress}>
                {eventDetail.contractAddress}
              </LinkToKlaytnScope>
            ),
          },
          { term: 'Token ID', description: ticketDetail.tokenId.toString() },
          { term: 'Token Standard', description: 'KIP-17' },
          { term: 'BlockChain', description: 'Klaytn' },
        ]}
      />
      <div className="flex translate-y-[5rem] items-center justify-between ">
        {ticketDetail.ticketSalesStatus === 'ON_SALE' && (
          <FormOrderButton amount={ticketDetail.price} ticketId={ticketDetail.id} eventId={eventDetail.id} />
        )}

        <Link href={`/tickets/${eventDetail.id}/${ticketDetail.id}`} passHref prefetch={true}>
          <a className="m-auto ">
            <Button>상세 페이지로 이동하기</Button>
          </a>
        </Link>
      </div>
    </article>
  );
}
