import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ checkLogged, component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      if (!checkLogged) {
        // not logged in so redirect to login page with the return url
        return <Redirect push to="/login" />;
      }
      // authorised so return component
      return (<Component {...props} />);
    }}
  />
);

export default PrivateRoute;
