import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Componet/Page/Login";
import Layout from "./Layout";
import { routerList } from "./Route/RouterLIst";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/login"} element={<Login />} />
        <Route path={"/"} element={<Layout />}>
          {routerList.map(({ path, component: Component }, index) => (
            <Route key={index} path={path} element={<Component />} />
          ))}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
