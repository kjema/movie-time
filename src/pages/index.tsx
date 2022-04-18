import Gallery from "@/components/Gallery";
import { getMovies } from "@/shared/api";
import { TmdbMovieItem } from "@/shared/models/tmdb";
import { GetServerSideProps, NextPage } from "next";
import { prisma } from "@/db/client";
import { Movie } from "@prisma/client";

// export const getServerSideProps: GetServerSideProps = async (_context) => {
//   const movies = await getMovies();
//   return {
//     props: {
//       movies,
//     },
//   };
// };
export const getServerSideProps: GetServerSideProps = async (_context) => {
  const movies = await prisma.movie.findMany();
  return {
    props: {
      movies: JSON.stringify(movies),
    },
  };
};

interface IndexProps {
  movies: string;
}

const Index: NextPage<IndexProps> = ({ movies }) => {
  return (
    <div className="my-6">
      {/* <Gallery movies={movies} /> */}
      <code>{movies}</code>
    </div>
  );
};

export default Index;
