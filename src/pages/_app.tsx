import type { AppProps } from "next/app";
import "css/fonts.css";
import "css/main.css";

const App = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />;
};

export default App;
