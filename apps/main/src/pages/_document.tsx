import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';

import { data } from '~/constants/seo';
import { GA_TRACKING_ID } from '~/libs/gtag';

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

          <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`} />
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
            }}
          />

          <meta name="naver-site-verification" content="654a4a445c7c03f1f99c7b363f4242dd3b253538" />
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
