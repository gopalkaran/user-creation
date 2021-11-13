import React from "react";
import { Route, Redirect } from "react-router-dom";
import {useSelector} from 'react-redux';


const PrivateRoute = ({ component: Component, ...rest }) => {
  const {user_id, user_token} = useSelector(state => state.user);

  return (
    <Route
      {...rest}
      render={(props) => {
        return user_id ? <Component {...props} /> : <Redirect to="/" />;
      }}
    ></Route>
  );
};

export default PrivateRoute;