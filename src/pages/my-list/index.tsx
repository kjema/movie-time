import { collection, onSnapshot, query } from "firebase/firestore";
import Head from "next/head";
import { NextPage } from "next/types";
import { useEffect, useState } from "react";
import { useAuth } from "~/features/auth/use-auth-context";
import { auth, db } from "~/shared/lib/firebase";

// const q = query(collection(db, "movie"));

const MyList: NextPage = () => {
  const { currentUser } = useAuth();
  const [movies, setMovies] = useState<any[]>([]);
  // useEffect(() => {
  //   console.log("useMoviesSnapshot useEffect");
  //   const unsubscribe = onSnapshot(q, (snapshot) => {
  //     setMovies(snapshot.docs.map((doc) => doc.data()));
  //   });
  //   return unsubscribe;
  // }, []);

  useEffect(() => {
    if (!currentUser) return;

    const collectionRef = collection(db, "movie");
    const q = query(collectionRef);
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      console.log(
        "useEffect",
        querySnapshot.docs.map((doc) => doc.data()),
      );
      setMovies(
        querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
          timestamp: doc.data().timestamp?.toDate().getTime(),
        })),
      );
    });
    return unsubscribe;
  }, [currentUser]);
  // const [values, loading, error] = useCollectionData<any>(query(collection(db, "movie")));

  if (!currentUser)
    return (
      <div>
        <div>Please sign in</div>
        <button onClick={() => auth.signIn()}>Sign in</button>
      </div>
    );

  return (
    <>
      <Head>
        <title>My List | MovieTime</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <button onClick={() => auth.signOut()}>Sign out</button>
      <pre>{JSON.stringify(movies, null, 2)}</pre>
      {/* {error && <strong>Error: {JSON.stringify(error)}</strong>}
      {loading && <span>Collection: Loading...</span>}
      {values && <pre>{JSON.stringify(values, null, 2)}</pre>} */}
    </>
  );
};

export default MyList;
