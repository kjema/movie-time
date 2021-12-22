type FanartImage = {
  id: string;
  url: string;
  lang: string;
  likes: string;
};

type FanartMovieDisc = FanartImage & {
  disc: string;
  disc_type: string;
};

export type FanartResult = {
  name: string;
  tmdb_id: string;
  imdb_id: string;
  hdmovieclearart: FanartImage[];
  movieposter: FanartImage[];
  hdmovielogo: FanartImage[];
  moviedisc: FanartMovieDisc[];
  moviebackground: FanartImage[];
  moviethumb: FanartImage[];
  moviebanner: FanartImage[];
  movielogo: FanartImage[];
  movieart: FanartImage[];
};
