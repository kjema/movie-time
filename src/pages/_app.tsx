import type { AppProps } from "next/app";
import Head from "next/head";
import React, { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import "tailwindcss/tailwind.css";
import { AuthProvider } from "~/features/auth/use-auth-context";
import { Nav } from "~/shared/components/nav";

const SafeAppContents = ({ Component, pageProps }: AppProps) => {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto max-w-6xl px-[30px] pt-24">
      <h1 className="text-[34px] font-extrabold text-gray-800">
        Movie<span className="text-blue-500">Time</span>
      </h1>
      {/* <Nav /> */}
      <ErrorBoundary fallback={<p>ErrorBoundary</p>}>
        <Suspense fallback={<p>Suspense...</p>}>
          <AuthProvider>
            <Component {...pageProps} />
          </AuthProvider>
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

const App = (props: AppProps) => {
  return (
    <>
      <Head>
        <title>MovieTime</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <SafeAppContents {...props} />
    </>
  );
};

export default App;
