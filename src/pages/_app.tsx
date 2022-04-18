import type { AppProps } from "next/app";
import Head from "next/head";
import Layout from "@/layouts/Layout";
import "@/styles/globals.css";

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>MovieTime</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          name="description"
          content="Show popular movies using the tmdb.org API."
        ></meta>
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default App;
