import React from 'react';
import {Redirect, Route} from "react-router-dom";
import {useAppSelector} from "../../../redux/hooks";


// @ts-ignore
const PrivateRoute = ({children, ...rest}) => {
  const authToken = useAppSelector(state => state.users.authToken);

  return <>
    <Route {...rest}
      render={() => {
        return authToken !== null
        ? children
        : <Redirect to={"/login"}/>
      }}
    />
  </>;
};


export default PrivateRoute;