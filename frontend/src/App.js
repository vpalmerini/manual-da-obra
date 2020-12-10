import React, { useContext } from "react";

import { Router, Switch, Route } from "react-router-dom";
import history from "routes/history";
import Dashboard from "views/Dashboard/Dashboard";
import Login from "views/Login/Login";

import { context } from "store/store";

import { ToastContainer } from "react-toastify";
import routes from "routes/routes";
import "./App.css";

const App = () => {
  const [state] = useContext(context);
  const { isLoggedIn } = state;

  return (
    <>
      <ToastContainer />
      <Router history={history}>
        <Switch>
          <Route path={routes.HOME} component={isLoggedIn ? Dashboard : Login} />
        </Switch>
      </Router>
    </>
  );
};

export default App;
