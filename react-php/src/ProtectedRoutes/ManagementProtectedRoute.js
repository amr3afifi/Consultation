import React from "react";
import { Route, Redirect } from "react-router-dom";

/**
     * Protected route to allow only management users.
     * @extends Component
     */
export const ManagementProtectedRoute = ({
  component: Component,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={props => {
        if (localStorage.getItem("isLoggedIn")==="true" && localStorage.getItem("userType")==="manager") {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/",
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