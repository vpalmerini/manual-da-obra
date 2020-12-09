import React from "react";
import { Route, Switch } from "react-router-dom";

import Dashboard from "views/Dashboard/Dashboard";
import Login from "views/Login/Login";
import routes from "./routes";

const router = (
  <Switch>
    <Route path={routes.DASHBOARD} component={Dashboard} />
    <Route path={routes.LOGIN} component={Login} />
  </Switch>
);

export default router;
