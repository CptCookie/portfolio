import React, { useContext, useEffect, useState } from "react";
import { Auth } from "./API/twitch.interface";
import { validate_user } from "./API";

const localStorageKey = "twitch_auth";

interface AuthContext {
  auth?: Auth;
  setAuth: (auth: Auth | undefined) => void;
}

const authContext = React.createContext<AuthContext>({
  auth: undefined,
  setAuth: (x) => {},
});

const AuthProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [auth, setAuth] = useState<Auth | undefined>(undefined);

  useEffect(() => {
    const local_token = window.localStorage.getItem(localStorageKey);
    if (local_token) {
      const token: Auth = JSON.parse(local_token);
      if (local_token && !auth) {
        setAuth(token);
      }
    }
  }, []);

  const setNewToken = (new_auth: Auth | undefined) => {
    console.log("setNewToken.setAuth");
    setAuth(new_auth);
    console.log("setNewToken.setlocalStore");
    window.localStorage.setItem(localStorageKey, JSON.stringify(new_auth));
    console.log("setNewToken.Done");
  };

  console.log("render auth Provider");

  return (
    <authContext.Provider value={{ auth: auth, setAuth: setNewToken }}>
      {children}
    </authContext.Provider>
  );
};

const useAuth = () => {
  return useContext(authContext);
};

export { useAuth, AuthProvider };
