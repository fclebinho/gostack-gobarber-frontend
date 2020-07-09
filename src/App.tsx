import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ConfigProvider } from 'react-avatar';

import { HooksProvider } from './hooks';
import Theme from './styles';
import { Routes } from './routes';

const App: React.FC = () => {
  return (
    <ConfigProvider colors={['red', 'green', 'blue']}>
      <BrowserRouter>
        <HooksProvider>
          <Routes />
        </HooksProvider>
        <Theme />
      </BrowserRouter>
    </ConfigProvider>
  );
};

export default App;
