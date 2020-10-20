import React from 'react';
import { isMac } from '@doombox-utils';
import { VIEWS } from '@doombox-utils/types';

// Core
import { Box } from '@material-ui/core';

import { Route } from '../../components';

import { AppBar } from '../AppBar';
import { Interrupt } from '../Interrupt';
import { Main } from '../Main';

const App = () => (
  <Box
    display="flex"
    flexDirection="column"
    overflow="hidden"
    height="100vh"
  >
    {!isMac && <AppBar />}
    <Route view={VIEWS.INTERRUPT}>
      <Interrupt />
    </Route>
    <Route view={[VIEWS.ALBUM, VIEWS.SONG]}>
      <Main />
    </Route>
  </Box>
);

export default App;
