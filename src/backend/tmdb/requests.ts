import * as Const from "~/shared/constants";

export const requests = {
  fetchTrending: {
    title: "Trending",
    url: `/trending/all/week?api_key=${Const.TMDB_API_KEY}&language=en-US`,
  },
  fetchTopRated: {
    title: "Top Rated",
    url: `/movie/top_rated?api_key=${Const.TMDB_API_KEY}&language=en-US`,
  },
  fetchActionMovies: {
    title: "Action",
    url: `/discover/movie?api_key=${Const.TMDB_API_KEY}&with_genres=28`,
  },
  fetchComedyMovies: {
    title: "Comedy",
    url: `/discover/movie?api_key=${Const.TMDB_API_KEY}&with_genres=35`,
  },
  fetchRomanceMovies: {
    title: "Romance",
    url: `/discover/movie?api_key=${Const.TMDB_API_KEY}&with_genres=10749`,
  },
  fetchTVMovies: {
    title: "TV Movie",
    url: `/discover/movie?api_key=${Const.TMDB_API_KEY}&with_genres=10770`,
  },
};
