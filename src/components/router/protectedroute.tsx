import React, { Component, useMemo } from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { getItemFromLocalStorage } from "../../utils/storage";

export interface ProtectedRouteProps {
  exact?: boolean;
  path: string;
  component: React.ComponentType<any>;
}
const Protectedroute = ({
  component: Component,
  ...rest
}: ProtectedRouteProps) => {
  const userDetails = useSelector((state: any) => state.userDetails);

  const isLoggedInUser = useMemo(() => {
    return (
      userDetails != null &&
      getItemFromLocalStorage("authToken") != null &&
      getItemFromLocalStorage("userId") != null
    );
  }, [userDetails]);

  return (
    <Route
      {...rest}
      render={(props) => {
        if (isLoggedInUser) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect to={{ pathname: "/", state: { from: props.location } }} />
          );
        }
      }}
    />
  );
};

export default Protectedroute;