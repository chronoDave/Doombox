import React from 'react';

export interface AppProps {
  children: React.ReactNode
}

export const App: React.FC<AppProps> = ({ children }) => (
  <div className="App">
    {children}
  </div>
);
