import type { AppProps } from "next/app";
import { ErrorBoundary } from "react-error-boundary";
import "tailwindcss/tailwind.css";
import { Suspense } from "react";

import useIsMounted from "~/shared/hooks/use-is-mounted";
import { Nav } from "~/shared/components/nav";

export default function Wrapper(props: AppProps) {
  const isMounted = useIsMounted();

  return isMounted ? <App {...props} /> : null;
}

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <div className="container mx-auto px-[30px] pt-24">
      <h1 className="text-[34px] font-extrabold">
        Movie<span className="text-blue-500">Time</span>
      </h1>
      <Nav />
      <ErrorBoundary fallback={<p>ErrorBoundary</p>}>
        <Suspense fallback={<p>Loading...</p>}>
          <Component {...pageProps} />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};
