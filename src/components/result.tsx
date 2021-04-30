import Image from "next/image";
import { TmdbMovieItem } from "utils/requests";
import { ThumbUpIcon } from "@heroicons/react/outline";

export const Result = ({ results }: { results: TmdbMovieItem[] }) => {
  // console.dir(results);
  return (
    <div className="flex-wrap gap-4 justify-center my-10 sm:grid md:grid-cols-2 xl:grid-cols-3 3xl:flex">
      {results.map((item) => (
        <Card key={item.id} item={item} />
      ))}
    </div>
  );
};

export const Card = ({ item }: { item: TmdbMovieItem }) => {
  const BASE_URL = "https://image.tmdb.org/t/p/original";
  return (
    <div className="transition duration-200 ease-in transform group sm:hover:scale-105">
      <Image
        layout="responsive"
        width={1920}
        height={1080}
        src={`${BASE_URL}${item.backdrop_path ?? item.poster_path}`}
      />
      <div className="p-2">
        <p className="max-w-md truncate">{item.overview}</p>
        <h2>{item.title ?? item.original_title}</h2>
        <p className="flex items-center opacity-0 group-hover:opacity-100">
          {item.release_date} <ThumbUpIcon className="mx-2 h-5" /> {item.vote_count}
        </p>
      </div>
    </div>
  );
};
