import React from 'react';

import { Window } from '../Window/Window';

import useClasses from './App.styles';

export interface AppProps {
  children: React.ReactNode
}

export const App = ({ children }: AppProps) => {
  const classes = useClasses();

  return (
    <div className={classes.root}>
      <Window />
      <div className={classes.body}>
        {children}
      </div>
    </div>
  );
};
