import { GetServerSideProps, NextPage } from "next";
import { useEffect, useState } from "react";
import Gallery from "~/components/Gallery";
import * as Const from "~/shared/constants";
import {
  TmdbMovieFilter,
  TmdbMovieItem,
  TmdbResponse,
} from "~/shared/models/tmdb";

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (Const.TMDB_API_KEY === undefined) {
    throw new Error("Environment variable TMDB_API_KEY is undefined");
  }

  const url = new URL("3/movie/popular", "https://api.themoviedb.org");
  url.searchParams.set("api_key", Const.TMDB_API_KEY);
  url.searchParams.set("language", "en-US");

  const request = new Request(url.href);
  const response = await fetch(request, { method: "GET" });

  if (!response.ok) return Promise.reject(response.statusText);
  const data: TmdbResponse = await response.json();

  return {
    props: {
      movies: data.results,
    },
  };
};

interface IndexProps {
  movies: TmdbMovieItem[];
}

const Index: NextPage<IndexProps> = ({ movies }) => {
  const [filteredMovies, setFilteredMovies] = useState(movies);
  const [activeFilter, setActiveFilter] = useState<TmdbMovieFilter>(
    TmdbMovieFilter.ALL,
  );

  useEffect(() => {
    if (activeFilter === TmdbMovieFilter.ALL) {
      setFilteredMovies(movies);
      return;
    }
    setFilteredMovies(
      movies.filter((movie) => movie.genre_ids.includes(activeFilter)),
    );
  }, [activeFilter, movies]);

  return (
    <div className="my-6">
      <div className="mb-4 flex gap-4 text-sm">
        <button
          onClick={() => {
            setActiveFilter(TmdbMovieFilter.ALL);
          }}
        >
          All
        </button>
        <button
          onClick={() => {
            setActiveFilter(TmdbMovieFilter.ACTION);
          }}
        >
          Action
        </button>
        <button
          onClick={() => {
            setActiveFilter(TmdbMovieFilter.COMEDY);
          }}
        >
          Comedy
        </button>
      </div>
      <Gallery movies={filteredMovies} />
    </div>
  );
};

export default Index;
