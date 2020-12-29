import React from "react";
import { Route, Redirect } from "react-router-dom";

/**
     * Protected route to allow only fan user.
     * @extends Component
     */
export const FanProtectedRoute = ({
  component: Component,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={props => {
        if (localStorage.getItem("isLoggedIn")==="true" && localStorage.getItem("userType")==="fan") {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/home",
                state: {
                  from: props.location
                }
              }}
            />
          );
        }
      }}
    />
  );
};