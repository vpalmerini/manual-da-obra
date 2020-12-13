import React, { useEffect, useContext } from "react";

import { Router, Switch, Route } from "react-router-dom";
import history from "routes/history";

import Dashboard from "views/Dashboard/Dashboard";
import Login from "views/Login/Login";

import NewConstruction from "views/Construction/NewConstruction/NewConstruction";
import EditConstruction from "views/Construction/EditConstruction/EditConstruction";
import DetailConstruction from "views/Construction/DetailConstruction/DetailConstruction";

import NewSystem from "views/System/NewSystem/NewSystem";
import EditSystem from "views/System/EditSystem/EditSystem";
import DetailSystem from "views/System/DetailSystem/DetailSystem";

import { context } from "store/store";
import types from "store/types";
import { me, logout } from "services/auth.service";

import { ToastContainer } from "react-toastify";
import routes from "routes/routes";
import PrivateRoute from "routes/PrivateRoute";
import "./App.css";

const App = () => {
  const [, dispatch] = useContext(context);

  useEffect(() => {
    const getMe = () => {
      me()
        .then(() => {
          dispatch({ type: types.LOGIN });
          history.push(routes.HOME);
        })
        .catch(() => {
          logout(true);
        });
    };
    getMe();
  }, []);

  return (
    <>
      <ToastContainer />
      <Router history={history}>
        <Switch>
          <Route path={routes.LOGIN} component={Login} />
          <PrivateRoute path={routes.NEW_CONSTRUCTION} component={NewConstruction} />
          <PrivateRoute path={routes.EDIT_SYSTEM} component={EditSystem} />
          <PrivateRoute path={routes.NEW_SYSTEM} component={NewSystem} />
          <PrivateRoute path={routes.DETAIL_SYSTEM} component={DetailSystem} />
          <PrivateRoute path={routes.EDIT_CONSTRUCTION} component={EditConstruction} />
          <PrivateRoute path={routes.DETAIL_CONSTRUCTION} component={DetailConstruction} />
          <PrivateRoute path={routes.HOME} component={Dashboard} />
        </Switch>
      </Router>
    </>
  );
};

export default App;
