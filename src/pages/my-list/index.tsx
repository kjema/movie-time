import Head from "next/head";
import { NextPage } from "next/types";
import { useMoviesSnapshot } from "~/features/my-list/use-movies";

const MyList: NextPage = () => {
  const movies = useMoviesSnapshot();
  return (
    <>
      <Head>
        <title>My List | MovieTime</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <h1>{movies[0]?.title}</h1>
    </>
  );
};

export default MyList;
