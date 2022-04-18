import { trpc } from "@/utils/trpc";
import { NextPage } from "next";

// export const getServerSideProps: GetServerSideProps = async (_context) => {
//   const movies = await getMovies();
//   return {
//     props: {
//       movies,
//     },
//   };
// };

const Index: NextPage = () => {
  const { data, isLoading } = trpc.useQuery(["movies.get-all"]);

  if (isLoading || !data) return <div>Loading...</div>;

  return (
    <div className="my-6">
      {/* <Gallery movies={movies} /> */}
      <div>{data[0]?.title}</div>
    </div>
  );
};

export default Index;
