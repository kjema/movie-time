export type TmdbMovieItem = {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: Date;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export type TmdbResponse = {
  page: number;
  results: TmdbMovieItem[];
  total_pages: number;
  total_results: number;
};
