import cn from "@/shared/classnames";
import * as Const from "@/shared/constants";
import { TmdbMovieItem } from "@/shared/models/tmdb";
import Image from "next/image";
import { useState } from "react";

interface MovieProps {
  movie: TmdbMovieItem;
}

export default function Movie({ movie }: MovieProps) {
  const [isLoading, setLoading] = useState(true);
  return (
    <div className="group">
      <div className="aspect-w-16 aspect-h-9 w-full transform overflow-hidden rounded-lg bg-gray-100 transition duration-300 ease-in-out sm:hover:scale-105">
        <Image
          alt="movie poster"
          src={`${Const.TMDB_BASE_IMAGE_URL}/${
            movie.backdrop_path ?? movie.poster_path
          }`}
          layout="fill"
          objectFit="cover"
          className={cn(
            "transition duration-300 ease-in-out",
            isLoading
              ? "scale-110 blur-2xl grayscale"
              : "scale-100 blur-0 grayscale-0",
          )}
          onLoadingComplete={() => setLoading(false)}
        />
      </div>
      <h2 className="mt-4 text-sm text-slate-700">{movie.release_date}</h2>
      <p className="mt-1 text-base font-medium text-slate-900">{movie.title}</p>
    </div>
  );
}
