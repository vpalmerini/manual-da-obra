import React from "react";
import { Route, Switch } from "react-router-dom";

import routes from "./routes";

const router = (
  <Switch>
    <Route path={routes.LOGIN} component={() => <h1>Login</h1>} />
  </Switch>
);

export default router;
