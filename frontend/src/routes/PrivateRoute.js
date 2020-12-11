import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";

import { context } from "store/store";
import routes from "./routes";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const [state] = useContext(context);

  return (
    <Route
      {...rest}
      render={(props) => (state.isLoggedIn ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: routes.LOGIN,
            state: { from: props.location },
          }}
        />
      ))}
    />
  );
};

export default PrivateRoute;
