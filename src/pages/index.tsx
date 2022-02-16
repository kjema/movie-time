import { GetServerSideProps, NextPage } from "next";
import Image from "next/image";
import { useEffect, useState } from "react";
import * as Const from "~/shared/const";
import { TmdbMovieItem, TmdbResponse } from "~/shared/models/tmdb";
import { motion, AnimatePresence } from "framer-motion";

const BASE_IMAGE_URL = "https://image.tmdb.org/t/p/w500";

enum Filter {
  ACTION = 28,
  ADVENTURE = 12,
  ALL = 0,
  ANIMATION = 16,
  COMEDY = 35,
  CRIME = 80,
  DOCUMENTARY = 99,
  DRAMA = 18,
  FAMILY = 10751,
  FANTASY = 14,
  HISTORY = 36,
  HORROR = 27,
  MUSIC = 10402,
  MYSTERY = 9648,
  ROMANCE = 10749,
  SCIENCE_FICTION = 878,
  THRILLER = 53,
  TV_MOVIE = 10770,
  WAR = 10752,
  WESTERN = 37,
}

const Index: NextPage<{ movies: TmdbMovieItem[] }> = ({ movies }) => {
  const [filteredMovies, setFilteredMovies] = useState(movies);
  const [activeFilter, setActiveFilter] = useState<Filter>(Filter.ALL);
  // const user = suspend(getInitialAuthState, ["initialAuthState"]);
  // console.log("Rendered", rendered++);
  // const { currentUser } = useAuth();

  useEffect(() => {
    if (activeFilter === Filter.ALL) {
      setFilteredMovies(movies);
      return;
    }
    setFilteredMovies(movies.filter((movie) => movie.genre_ids.includes(activeFilter)));
  }, [activeFilter, movies]);

  return (
    // sm:grid md:grid-cols-2 xl:grid-cols-3
    <div className="my-6">
      <h4 className="mb-3 text-xl font-black text-gray-800">Popular Movies</h4>
      <div className="mb-4 flex gap-4 text-sm">
        <button
          onClick={() => {
            setActiveFilter(Filter.ALL);
          }}
        >
          All
        </button>
        <button
          onClick={() => {
            setActiveFilter(Filter.ACTION);
          }}
        >
          Action
        </button>
        <button
          onClick={() => {
            setActiveFilter(Filter.COMEDY);
          }}
        >
          Comedy
        </button>
      </div>
      <motion.div
        className="gap-4 sm:grid md:grid-cols-2 xl:grid-cols-3"
        // style={{ gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))" }}
      >
        <AnimatePresence>
          {filteredMovies.map((movie) => (
            <motion.div
              layout
              animate={{ opacity: 1 }}
              initial={{ opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              key={movie.id}
              className="group relative w-[368px] transform transition duration-300 ease-out sm:hover:scale-105"
            >
              <div className="mb-1 text-xs font-semibold">{movie.title}</div>
              <Image
                alt="movie poster"
                // layout="fill"
                // objectFit="cover"
                width={348}
                height={196}
                src={`${BASE_IMAGE_URL}${movie.backdrop_path ?? movie.poster_path}`}
                className="rounded-lg"
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );

  // return (
  //   <>
  //     {currentUser ? (
  //       <div>
  //         <button onClick={() => auth.signOut()}>Signout</button>
  //         <div>{currentUser.displayName}</div>
  //       </div>
  //     ) : (
  //       <button onClick={() => auth.signIn()}>Signin</button>
  //     )}
  //     {/* <Result results={results} /> */}
  //   </>
  // );
};

// export const getStaticProps: GetStaticProps = async (_context) => {
//   return {
//     props: {}, // will be passed to the page component as props
//   };
// };

export const getServerSideProps: GetServerSideProps = async (context) => {
  // const { genre } = context.query;
  const url = new URL("3/movie/popular", "https://api.themoviedb.org");
  url.searchParams.set("api_key", Const.TMDB_API_KEY ?? "");
  url.searchParams.set("language", "en-US");

  const request = new Request(url.href);

  const response = await fetch(request, { method: "GET" });

  if (!response.ok) return Promise.reject("fetch failed");
  const data: TmdbResponse = await response.json();

  return {
    props: {
      movies: data.results,
    },
  };
};

export default Index;
