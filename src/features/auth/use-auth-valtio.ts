import { proxy, useSnapshot } from "valtio";
import { auth, User } from "~/shared/lib/firebase";

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

export const useAuth = () => {
  return useSnapshot(state);
};
