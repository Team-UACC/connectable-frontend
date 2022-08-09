import Head from 'next/head';

import { data } from '~/constants/seo';

interface Props {
  title?: string;
  description?: string;
  url?: string;
  image: string;
  creator?: string;
}

const HeadMeta = ({ title, description, url, image, creator }: Props) => {
  return (
    <Head>
      <title>{title ?? data.title}</title>
      <meta name="description" content={description ?? data.description} />
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      <meta property="og:title" content={title ?? data.title} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url ?? data.url} />
      <meta property="og:image" content={image} />
      <meta property="og:article:author" content="Connectable" />

      <meta name="twitter:creator" content={data.creator ?? creator} />
      <meta name="twitter:site" content={'@' + data.creator} />
      <meta name="twitter:title" content={data.title} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:description" content={data.description} />
    </Head>
  );
};

export default HeadMeta;
