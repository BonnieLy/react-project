import Gallery from "../../pages/Gallery";
import Home from "../../pages/Home";
import Login from "../../pages/Login";
import React from "react";
import Register from "../../pages/Register";

const routes = [
  {
    path: "/",
    exact: true,
    component: () => <Home />,
    protected: null,
  },
  {
    path: "/login",
    exact: true,
    component: () => <Login />,
    protected: "guest",
  },
  {
    path: "/gallery",
    exact: true,
    component: () => <Gallery />,
    protected: "auth",
  },
  {
    path: "/register",
    exact: true,
    component: () => <Register />,
    protected: "guest",
  },
];

export default routes;
