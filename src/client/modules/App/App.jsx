import React from 'react';
import { VIEWS } from '@doombox-utils/types';

// Core
import { Route } from '../../components';
import { MainView, InterruptView } from '../../views';

import { AppBar } from '../AppBar';

// Styles
import useAppStyles from './App.styles';

const App = () => {
  const classes = useAppStyles();

  return (
    <div className={classes.root}>
      {process.platform !== 'darwin' && <AppBar />}
      <Route view={VIEWS.INTERRUPT}>
        <InterruptView />
      </Route>
      <Route view={[VIEWS.ALBUM, VIEWS.SONG]}>
        <MainView />
      </Route>
    </div>
  );
};

export default App;
