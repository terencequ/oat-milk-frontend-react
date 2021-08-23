import React from 'react';
import {Redirect, Route, RouteProps} from "react-router-dom";
import {isLoggedInSelector} from "../../../redux/slices/usersSlice";

interface PrivateRouteProps extends RouteProps {
  children: JSX.Element;
}

const PrivateRoute = ({children, ...rest}: PrivateRouteProps) => {
  const isLoggedIn = isLoggedInSelector()();

  return <>
    <Route {...rest}
      render={() => {
        return isLoggedIn
        ? children
        : <Redirect to={"/login"}/>
      }}
    />
  </>;
};


export default PrivateRoute;