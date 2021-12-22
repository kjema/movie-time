import type { AppProps } from "next/app";

import "~/styles/globals.css";
import { Nav } from "~/shared/components/nav";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <div className="container px-[30px] pt-24 mx-auto">
      <h1 className="text-[34px] font-extrabold">
        Movie<span className="text-blue-500">Time</span>
      </h1>
      <Nav />
      <Component {...pageProps} />
    </div>
  );
};

export default App;
