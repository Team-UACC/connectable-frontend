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
          <link rel="apple-touch-icon" sizes="180x180" href={data.favicons.appleTouchIcon} />
          <link rel="icon" type="image/png" sizes="32x32" href={data.favicons[32]} />
          <link rel="icon" type="image/png" sizes="16x16" href={data.favicons[16]} />
          <link rel="manifest" href={data.favicons.manifest} />

          <link rel="shortcut icon" href={data.favicons.appleTouchIcon} />
          <link rel="mask-icon" href={data.favicons[32]} />

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
