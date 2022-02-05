import Head from "next/head";
import { NextPage } from "next";

import { auth, User } from "~/shared/lib/firebase";
import { proxy, useSnapshot } from "valtio";

let resolve: (value: User | PromiseLike<User | null> | null) => void = () => {};
const initialCurrentUser: Promise<User | null> = new Promise((r) => {
  resolve = r;
  // const unsubscribe = auth.onAuthChange((firebaseUser) => {
  //   console.log("firebaseUser", firebaseUser);
  //   if (firebaseUser === null) return resolve(null);
  //   resolve(firebaseUser);
  //   unsubscribe();
  // });
});

auth.onAuthChange((firebaseUser) => {
  resolve(firebaseUser);
  state.currentUser = firebaseUser;
});

type State = {
  currentUser: Promise<User | null> | User | null;
};

const state: State = proxy({
  currentUser: initialCurrentUser,
});

// let rendered = 0;

const Home: NextPage = () => {
  // const user = suspend(getInitialAuthState, ["initialAuthState"]);
  // console.log("Rendered", rendered++);
  const { currentUser } = useSnapshot(state);

  return (
    <>
      <Head>
        <title>start | MovieTime</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      {currentUser ? (
        <div>
          <button onClick={() => auth.signOut()}>Signout</button>
          <div>{currentUser.displayName}</div>
        </div>
      ) : (
        <button onClick={() => auth.signIn()}>Signin</button>
      )}
      {/* <Result results={results} /> */}
    </>
  );
};

// export const getStaticProps: GetStaticProps = async (_context) => {
//   return {
//     props: {}, // will be passed to the page component as props
//   };
// };

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const genre: keyof typeof requests =
//     (context.query.genre as keyof typeof requests) ?? "fetchTrending";
//   const url = `https://api.themoviedb.org/3${requests[genre].url}`;
//   const res = (await fetch(url).then((res) => res.json())) as TmdbResponse;

//   return {
//     props: {
//       results: res.results,
//     }, // will be passed to the page component as props
//   };
// };

export default Home;
