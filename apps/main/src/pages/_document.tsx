import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <title>Connectable</title>
          <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
          <meta property="og:title" content="Connectable" />
          <meta property="og:image" content="" />
          <meta name="description" content="디지털 티켓의 새로운 패러다임" />
          <meta property="og:description" content="디지털 티켓의 새로운 패러다임" />

          <meta name="twitter:creator" content="UACC" />
          <meta name="twitter:site" content="@Connectable" />
          <meta name="twitter:title" content="Connectable" />
          <meta name="twitter:description" content="디지털 티켓의 새로운 패러다임" />

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
