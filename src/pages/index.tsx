import Head from "next/head";
import { GetServerSideProps, NextPage } from "next";

import { Nav } from "~/shared/components/nav";
import { Result } from "~/shared/components/result";
import { TmdbMovieItem, TmdbResponse } from "~/shared/models/tmdb";
import { requests } from "~/features/tmdb/requests";

const Home: NextPage<{ results: TmdbMovieItem[] }> = ({ results }) => {
  return (
    <>
      <Head>
        <title>start | MovieTime</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="container px-[30px] pt-24 mx-auto">
        <h1 className="text-[34px] font-extrabold">
          Movie<span className="text-blue-500">Time</span>
        </h1>
        <p className="text-[17px]">My List</p>
        <Nav />
        <Result results={results} />
      </div>
    </>
  );
};

// export const getStaticProps: GetStaticProps = async (_context) => {
//   return {
//     props: {}, // will be passed to the page component as props
//   };
// };

export const getServerSideProps: GetServerSideProps = async (context) => {
  const genre: keyof typeof requests =
    (context.query.genre as keyof typeof requests) ?? "fetchTrending";
  const url = `https://api.themoviedb.org/3${requests[genre].url}`;
  const res = (await fetch(url).then((res) => res.json())) as TmdbResponse;

  return {
    props: {
      results: res.results,
    }, // will be passed to the page component as props
  };
};

export default Home;
