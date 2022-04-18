import Gallery from "@/components/Gallery";
import { getMovies } from "@/shared/api";
import { TmdbMovieItem } from "@/shared/models/tmdb";
import { GetServerSideProps, NextPage } from "next";
import { prisma } from "@/db/client";
import { Movie } from "@prisma/client";
import { trpc } from "@/utils/trpc";

// export const getServerSideProps: GetServerSideProps = async (_context) => {
//   const movies = await getMovies();
//   return {
//     props: {
//       movies,
//     },
//   };
// };

interface IndexProps {
  movies: string;
}

const Index: NextPage<IndexProps> = ({ movies }) => {
  const { data, isLoading } = trpc.useQuery(["getAllMovies"]);

  if (isLoading || !data) return <div>Loading...</div>;

  console.log(data)
  return (
    <div className="my-6">
      {/* <Gallery movies={movies} /> */}
      <div>{data[0]?.title}</div>
    </div>
  );
};

export default Index;
