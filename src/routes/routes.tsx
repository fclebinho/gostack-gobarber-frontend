import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { PrivateRoute } from '../components';
import { SignIn, SignUp, Dashboard } from '../pages';

export const Routes: React.FC = () => (
  <Switch>
    <PrivateRoute path="/" exact component={Dashboard} />
    <Route path="/sign-up" component={SignUp} />
    <Route path="/sign-in" component={SignIn} />
  </Switch>
);

export default Routes;
