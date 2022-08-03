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
          <meta property="og:title" content="Connectable" />
          <meta property="og:image" content="" />
          <meta name="description" content="디지털 티켓의 새로운 패러다임" />
          <meta property="og:description" content="디지털 티켓의 새로운 패러다임" />

          <link rel="apple-touch-icon" sizes="180x180" href="/images/favicon/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon/favicon-16x16.png" />
          <link rel="manifest" href="/images/favicon/site.webmanifest" />

          <link rel="shortcut icon" href="/images/favicon/apple-touch-icon.png" />
          <link rel="mask-icon" href="/images/favicon/favicon-32x32.png" />

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
