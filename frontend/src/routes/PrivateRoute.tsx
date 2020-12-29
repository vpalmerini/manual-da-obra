import * as React from "react";
import { useContext } from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";

import { context } from "store/store";
import routes from "./routes";

interface PrivateRouteProps extends RouteProps {
  component: any;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  component: Component,
  ...rest
}) => {
  const { state } = useContext(context);

  return (
    <Route
      {...rest}
      render={(props) =>
        state.isLoggedIn ? (
          <Component {...rest} />
        ) : (
          <Redirect
            to={{
              pathname: routes.LOGIN,
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
