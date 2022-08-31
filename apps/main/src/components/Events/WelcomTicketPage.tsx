import Image from 'next/image';

import FormOrderButton from '~/components/Button/OrderButton/FormOrderButton';
import { ArtistImageBox, ArtistName, PriceText, RemainingTicketStatus } from '~/components/Events/EventInfo';
import LinkBox from '~/components/Events/LinkBox';
import StickyBlurFooter from '~/components/Footer/StickyBlurFooter';
import HeadMeta from '~/components/HeadMeta';
import DotText from '~/components/Text/DotText';
import LinkText from '~/components/Text/LinkText';
import LinkToKlaytnScope from '~/components/Text/LinkToKlaytnScope';
import TextInfo from '~/components/Text/TextInfo';
import { IMAGE_BLUR_DATA_URL } from '~/constants/contents';
import { data } from '~/constants/seo';
import { EventDetailType } from '~/types/eventType';

interface Props {
  eventDetail: EventDetailType;
}

export default function WelcomeTicketPage({ eventDetail }: Props) {
  return (
    <>
      <HeadMeta
        title={`컬렉션 | ${eventDetail.name}`}
        image={eventDetail.image}
        description={eventDetail.description}
        url={data.url + `/events/${eventDetail.id}`}
        creator={eventDetail.artistName}
      />

      <article className="relative w-full mb-10 ">
        <ArtistImageBox src={eventDetail.artistImage} />
        <section className="flex flex-col justify-between h-40 my-6">
          <div className="flex justify-between mb-4">
            <ArtistName artistName={eventDetail.artistName} />
            <LinkBox
              twitterUrl={eventDetail.twitterUrl}
              instagramUrl={eventDetail.instagramUrl}
              webpageUrl={eventDetail.webpageUrl}
            />
          </div>
          <h1 className="text-2xl font-bold ">{eventDetail.name}</h1>
          <div className="flex justify-between leading-6">
            <RemainingTicketStatus
              totalTicketCount={eventDetail.totalTicketCount}
              onSaleTicketCount={eventDetail.onSaleTicketCount}
            />
            {eventDetail.salesOption === 'FLAT_PRICE' && (
              <PriceText>{`${eventDetail.price.toLocaleString('ko-KR')}원`}</PriceText>
            )}
          </div>
        </section>
        <Image
          src={eventDetail.image}
          width={388}
          height={388}
          objectFit="cover"
          layout="responsive"
          priority
          placeholder="blur"
          blurDataURL={IMAGE_BLUR_DATA_URL}
        />
        <br />

        <TextInfo.Simple title={`환영합니다`}>{eventDetail.description}</TextInfo.Simple>
        <AdditionalGuidance />
        <TextInfo
          title="NFT 컬렉션 상세"
          contents={[
            {
              term: 'Contract Address',
              description: (
                <LinkToKlaytnScope type="account" account={eventDetail.contractAddress}>
                  {eventDetail.contractAddress}
                </LinkToKlaytnScope>
              ),
            },
            { term: 'Token Standard', description: 'KIP-17' },
            { term: 'BlockChain', description: 'Klaytn' },
            {
              term: 'OpenSea',
              description: <LinkText href={eventDetail.openseaUrl}>오픈씨에서 확인하기</LinkText>,
            },
          ]}
        />
      </article>
      <StickyBlurFooter className=" w-[calc(100%+32px)] ">
        <FormOrderButton amount={0} ticketId={0} eventId={eventDetail.id} />
      </StickyBlurFooter>
    </>
  );
}

const AdditionalGuidance = () => {
  return (
    <>
      <div className="w-full px-2 py-4 text-sm">
        <h2 className="text-xl font-bold">웰컴티켓 안내</h2>
        <ul>
          <DotText>Connectable에 가입하신 분들을 위한 NFT 입니다.</DotText>
          <DotText>NFT 티켓 구매 절차를 체험할 수 있습니다.</DotText>
          <DotText>해당 NFT는 거래가 불가능하며 1인 1매만 구매 가능합니다.</DotText>
        </ul>
      </div>
      <div className="w-full px-2 py-4 text-sm">
        <h2 className="text-xl font-bold">구매절차 안내</h2>
        <ul>
          <DotText>Klip을 통해 Connectable에 로그인합니다.</DotText>
          <DotText>하단바의 {"'구매하기'"} 버튼을 클릭해 구매 폼을 제출합니다.</DotText>
          <DotText>티켓 구매 폼을 제출하시면 확인 후 NFT가 전송됩니다.</DotText>
          <DotText>구매한 티켓은 마이페이지에서 확인할 수 있습니다.</DotText>
        </ul>
      </div>
    </>
  );
};
