import React from 'react';

import './App.scss';

export interface AppProps {
  children: React.ReactNode
}

export const App: React.FC<AppProps> = ({ children }) => (
  <div className="App">
    {children}
  </div>
);
