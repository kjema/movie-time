import React, { createContext, useEffect, useState } from "react";
import { suspend } from "suspend-react";
import { auth, User } from "~/shared/lib/firebase";

type Context = {
  currentUser: Promise<User | null> | User | null;
};

// let resolve: (value: User | PromiseLike<User | null> | null) => void = () => {};
// const initialCurrentUser: Promise<User | null> = new Promise((r) => {
//   resolve = r;
// });

const getInitialAuthState = async (): Promise<User | null> => {
  return new Promise((resolve) => {
    const unsubscribe = auth.onAuthChange((user) => {
      resolve(user ?? null);
      unsubscribe();
    });
  });
};

const authContext = createContext({} as Context);

export const AuthProvider: React.FunctionComponent = ({ children }) => {
  const [context, setContext] = useState<Context>({
    currentUser: suspend(getInitialAuthState, ["initialAuthState"]),
  });
  console.log("AuthProvider rendered");

  // let user = suspend(getInitialAuthState, ["initialAuthState"]);

  // if (state.currentUser instanceof Promise) {
  //   throw initialCurrentUser;
  // }

  useEffect(() => {
    console.log("AuthProvider useEffect");
    const unsubscribe = auth.onAuthChange((user) => {
      setContext({ currentUser: user });
    });
    return unsubscribe;
  }, []);

  return <authContext.Provider value={context}>{children}</authContext.Provider>;
};

export const useAuth = () => {
  return React.useContext(authContext);
};
