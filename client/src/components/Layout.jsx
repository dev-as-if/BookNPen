// components/Layout.jsx
import React from "react";
import Navigation from "./navigation";
import { Outlet } from "react-router-dom";

const Layout = () => (
  <>
    <Navigation />
    <div>
      <Outlet />
    </div>
  </>
);

export default Layout;