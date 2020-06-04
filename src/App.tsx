import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { HooksProvider } from './hooks';
import Theme from './styles';
import { Routes } from './routes';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <HooksProvider>
        <Routes />
      </HooksProvider>
      <Theme />
    </BrowserRouter>
  );
};

export default App;
