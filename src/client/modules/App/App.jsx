import React from 'react';
import { VIEWS } from '@doombox-utils/types';

// Core
import { Route } from '../../components';

import { AppBar } from '../AppBar';
import { Interrupt } from '../Interrupt';
import { Main } from '../Main';

// Styles
import useAppStyles from './App.styles';

const App = () => {
  const classes = useAppStyles();

  return (
    <div className={classes.root}>
      {process.platform !== 'darwin' && <AppBar />}
      <Route view={VIEWS.INTERRUPT}>
        <Interrupt />
      </Route>
      <Route view={[VIEWS.ALBUM, VIEWS.SONG]}>
        <Main />
      </Route>
    </div>
  );
};

export default App;
