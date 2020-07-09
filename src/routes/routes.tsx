import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { PrivateRoute } from '../components';
import {
  SignIn,
  SignUp,
  Profile,
  Dashboard,
  ForgotPassword,
  ResetPasswordPage,
} from '../pages';

export const Routes: React.FC = () => (
  <Switch>
    <PrivateRoute path="/" exact component={Dashboard} />
    <PrivateRoute path="/profile" exact component={Profile} />
    <Route path="/sign-up" component={SignUp} />
    <Route path="/sign-in" component={SignIn} />
    <Route path="/forgot-password" component={ForgotPassword} />
    <Route path="/reset-password" component={ResetPasswordPage} />
  </Switch>
);

export default Routes;
