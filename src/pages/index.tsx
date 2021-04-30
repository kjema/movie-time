import { Nav } from "components/nav";
import { GetServerSideProps, NextPage } from "next";
import { requests, TmdbMovieItem, TMDBResponse } from "utils/requests";
import { Result } from "components/result";
import Head from "next/head";

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
  const res = (await fetch(url).then((res) => res.json())) as TMDBResponse;

  return {
    props: {
      results: res.results,
    }, // will be passed to the page component as props
  };
};

export default Home;
