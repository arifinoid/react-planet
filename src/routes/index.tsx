import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Layout from "../layout";

import Home from "../pages/home";
import PlanetDetail from "../pages/planet-detail";

export const Routes = () => (
  <BrowserRouter>
    <Layout>
      <Route path="/" exact component={Home} />
      <Route path="/planet/:id" exact component={PlanetDetail} />
    </Layout>
  </BrowserRouter>
);
