import React from 'react';

import { AuthProvider } from './auth';
import { ToastProvider } from '../components';

export const HooksProvider: React.FC = ({ children }) => (
  <AuthProvider>
    <ToastProvider>{children}</ToastProvider>
  </AuthProvider>
);

export * from './auth';
