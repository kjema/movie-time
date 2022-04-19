import { trpc } from "@/utils/trpc";
import { useRouter } from "next/router";

const MoviePageContent: React.FC<{ id: string }> = ({ id }) => {
  const { data, isLoading } = trpc.useQuery(["movies.get-by-id", { id }]);

  if (!isLoading && !data) return <div>No movie found</div>;

  return (
    <div className="my-6">
      <div>{data?.title}</div>
    </div>
  );
};

const MoviePage = () => {
  const { query } = useRouter();
  const { id } = query;

  if (!id || typeof id !== "string") {
    return <div>No movie id provided</div>;
  }

  return <MoviePageContent id={id} />;
};

export default MoviePage;
