import { onSnapshot } from "@firebase/firestore";
import { collection, doc, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "~/shared/lib/firebase";

const q = query(collection(db, "movie"));

export const useMoviesSnapshot = () => {
  const [movies, setMovies] = useState<any[]>([]);
  useEffect(() => {
    console.log("useMoviesSnapshot useEffect");
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMovies(snapshot.docs.map((doc) => doc.data()));
    });
    return unsubscribe;
  }, []);
  return movies;
};
