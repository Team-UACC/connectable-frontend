import Image from 'next/image';

import { IMAGE_BLUR_DATA_URL } from '~/constants/contents';
import BookingGuidance from '~/constants/lets-rock/BookingGuidance';
import EntranceGuidance from '~/constants/lets-rock/EntranceGuidance';
import EtcGuidance from '~/constants/lets-rock/EtcGuidance';
import { LETS_ROCK } from '~/constants/lets-rock/metadata';
import RefundGuidance from '~/constants/lets-rock/RefundGuidance';
import { EventDetailType } from '~/types/eventType';
import { Ticket } from '~/types/ticketType';
import { dayjsKO } from '~/utils/day';

import { PriceText } from '../Events/EventInfo';
import EventSaleTimer from '../Events/EventSaleTimer';
import LinkText from '../Text/LinkText';
import LinkToKlaytnScope from '../Text/LinkToKlaytnScope';
import TextInfo from '../Text/TextInfo';

interface Props {
  ticketDetail: Ticket;
  eventDetail: EventDetailType;
}

export default function TicketDetailArticle({ ticketDetail, eventDetail }: Props) {
  return (
    <article className="w-full ">
      <div className=" relative w-[calc(100%+2rem)] p-4 -translate-x-4 bg-gray-100 ">
        <div className="m-2 max-w-fit drop-shadow-2xl">
          <Image
            src={ticketDetail.metadata.image}
            width={388}
            height={388}
            objectFit="cover"
            className="rounded-[10px] "
            priority
            placeholder="blur"
            blurDataURL={IMAGE_BLUR_DATA_URL}
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
      {eventDetail.name === LETS_ROCK.name && (
        <>
          <BookingGuidance />
          <RefundGuidance />
          <EntranceGuidance />
          <EtcGuidance />
        </>
      )}
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
          {
            term: 'OpenSea',
            description: (
              <LinkText
                href={`https://opensea.io/assets/klaytn/${ticketDetail.contractAddress}/${ticketDetail.tokenId}`}
              >
                오픈씨에서 확인하기
              </LinkText>
            ),
          },
        ]}
      />
    </article>
  );
}
