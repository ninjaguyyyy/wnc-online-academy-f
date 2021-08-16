import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
const PrivateRoute = ({ component: Component, ...rest }) => {
  const { token, userInfo } = useSelector((state) => state.user);
  return <Route {...rest} render={(props) => (token && userInfo.role === 3 ? <Component {...props} /> : <Redirect to="/dashboard" />)} />;
};
export default PrivateRoute;
