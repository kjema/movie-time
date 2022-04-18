import Gallery from "@/components/Gallery";
import { getMovies } from "@/shared/api";
import { TmdbMovieItem } from "@/shared/models/tmdb";
import { GetServerSideProps, NextPage } from "next";

export const getServerSideProps: GetServerSideProps = async (_context) => {
  const movies = await getMovies();
  return {
    props: {
      movies,
    },
  };
};

interface IndexProps {
  movies: TmdbMovieItem[];
}

const Index: NextPage<IndexProps> = ({ movies }) => {
  return (
    <div className="my-6">
      <Gallery movies={movies} />
    </div>
  );
};

export default Index;
