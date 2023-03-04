import React from "react";
import { useAuth } from "./AuthProvider";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";
import TimeLine from "./TimeLine"

const Router: React.FC<React.PropsWithChildren> = ({ children }) => {
  const auth = useAuth();

  return (
    <BrowserRouter>
      {children}
      <Routes>
        {auth.auth?.access_token && <Route path={"/"} element={<TimeLine/>} />}
        {!auth.auth?.access_token && <Route path={"/"} element={<Login />} />}
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
