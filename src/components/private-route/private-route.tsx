import React from 'react';
import {
  Route,
  RouteProps as ReactDOMRouteProps,
  Redirect,
  useHistory,
} from 'react-router-dom';

import { useAuth } from '../../hooks';

interface RouteProps extends ReactDOMRouteProps {
  component: React.ComponentType;
}

export const PrivateRoute: React.FC<RouteProps> = ({
  component: Component,
  ...rest
}) => {
  const { user } = useAuth();

  return (
    <Route
      {...rest}
      render={({ location }) => {
        return user ? (
          <Component />
        ) : (
          <Redirect to={{ pathname: '/sign-in', state: { location } }} />
        );
      }}
    />
  );
};

export default PrivateRoute;
