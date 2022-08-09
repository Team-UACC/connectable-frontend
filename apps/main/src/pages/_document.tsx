import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';

import { data } from '~/constants/seo';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <meta property="og:title" content={data.title} />
          <meta property="og:image" content={data.images.logo} />
          <meta name="description" content={data.description} />
          <meta property="og:description" content={data.description} />

          <link rel="apple-touch-icon" sizes="180x180" href={data.favicons.appleTouchIcon} />
          <link rel="icon" type="image/png" sizes="32x32" href={data.favicons[32]} />
          <link rel="icon" type="image/png" sizes="16x16" href={data.favicons[16]} />
          <link rel="manifest" href={data.favicons.manifest} />

          <link rel="shortcut icon" href={data.favicons.appleTouchIcon} />
          <link rel="mask-icon" href={data.favicons[32]} />

          <meta name="twitter:creator" content={data.creator} />
          <meta name="twitter:site" content={'@' + data.title} />
          <meta name="twitter:title" content={data.title} />
          <meta name="twitter:description" content={data.description} />

          <meta charSet="utf-8" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
