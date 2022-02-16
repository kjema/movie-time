import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en" className="text-slate-900 antialiased">
        <Head>
          <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
