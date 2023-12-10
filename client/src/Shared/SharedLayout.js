import React from "react";
import Header from "../Pages/Header/Header";
import { Outlet } from "react-router-dom";

function SharedLayout({ logout }) {
  return (
    <>
      <Header logout={logout} />
      <Outlet />
    </>
  );
}

export default SharedLayout;
