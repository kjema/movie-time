import type { AppProps } from "next/app";
import "css/fonts.css";
import "css/main.css";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
