import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'
const PrivateRoute = ({
  component: Component,
  ...rest
}) => {
  const { signIn } = useSelector((state) => state.sign)
  console.log(signIn)
  return <Route {...rest} render={(props) => (signIn?.accessToken&&signIn?.user.role===1 ? <Component {...props} /> : <Redirect to="/dashboard" />)} />;
};
export default PrivateRoute;
