import { TmdbMovieItem } from "~/shared/models/tmdb";
import Movie from "./Movie";

interface GalleryProps {
  movies: TmdbMovieItem[];
}

export default function Gallery({ movies }: GalleryProps) {
  return (
    <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
      {movies.map((movie) => (
        <Movie key={movie.id} movie={movie} />
      ))}
    </div>
  );
}
