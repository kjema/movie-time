import { trpc } from "@/utils/trpc";
import { NextPage } from "next";
import * as React from "react";

// export const getServerSideProps: GetServerSideProps = async (_context) => {
//   const movies = await getMovies();
//   return {
//     props: {
//       movies,
//     },
//   };
// };

function CreateMovie() {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const client = trpc.useContext();
  const { mutate, isLoading } = trpc.useMutation("movies.create", {
    onSuccess: () => {
      client.invalidateQueries("movies.get-all");
    },
  });

  return (
    <input
      ref={inputRef}
      disabled={isLoading}
      onKeyDown={(event) => {
        if (event.key === "Enter") {
          console.log(event.currentTarget.value);
          mutate({ title: event.currentTarget.value });
          if (!inputRef.current) return;
          inputRef.current.value = "";
        }
      }}
    />
  );
}

const Index: NextPage = () => {
  const { data, isLoading, isError, error } = trpc.useQuery(["movies.get-all"]);

  if (isError) return <div>{error.message}</div>;

  if (isLoading || !data) return <div>Loading...</div>;

  return (
    <div className="my-6">
      {/* <Gallery movies={movies} /> */}
      <CreateMovie />
      <div>
        {data.map((movie) => (
          <div key={movie.id}>{movie.title}</div>
        ))}
      </div>
    </div>
  );
};

export default Index;
