import React, { Fragment } from "react";

import Navbar from "./Navbar";

const Layout = ({ children }: { children: JSX.Element | JSX.Element[] }) => (
  <Fragment>
    <Navbar />
    {children}
  </Fragment>
);

export default Layout;
