import React from 'react';
import {Redirect, Route, RouteProps} from "react-router-dom";
import {useAppSelector} from "../../../redux/hooks";
import {isLoggedInSelector} from "../../../redux/slices/usersSlice";

interface PrivateRouteProps extends RouteProps {
  children: JSX.Element;
}

const PrivateRoute = ({children, ...rest}: PrivateRouteProps) => {
  const usersState = useAppSelector(state => state.users);
  const isLoggedIn = isLoggedInSelector(usersState);

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