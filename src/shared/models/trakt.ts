export type TaktResult = {
  type: string;
  score: number;
  movie: {
    title: string;
    year: number;
    ids: {
      trakt: number;
      slug: string;
      imdb: string | null;
      tmdb: number;
    };
  };
};
