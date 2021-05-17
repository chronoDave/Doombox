import React from 'react';

import styles from './App.styles';

export interface AppProps {
  children: React.ReactNode
}

export const App: React.FC<AppProps> = ({ children }) => {
  const classes = styles();

  return (
    <div className={classes.root}>
      {children}
    </div>
  );
};
