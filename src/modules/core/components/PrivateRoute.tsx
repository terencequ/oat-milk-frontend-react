import React from 'react';
import {Redirect, Route} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../redux/hooks";
import {isLoggedInSelector} from "../../../redux/slices/usersSlice";


// @ts-ignore
const PrivateRoute = ({children, ...rest}) => {
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