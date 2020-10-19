import React from 'react';
import { isMac } from '@doombox-utils';
import { VIEWS } from '@doombox-utils/types';

// Core
import { Box } from '@material-ui/core';

import { Route } from '../../components';

import { AppBar } from '../AppBar';
import { Interrupt } from '../Interrupt';
import { Player } from '../Player';
import { Playlist } from '../Playlist';
import { LibrarySongs } from '../LibrarySongs';
import { LibraryAlbums } from '../LibraryAlbums';

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
      <Box display="flex" minHeight={0}>
        <Box display="flex" flexDirection="column">
          <Player />
          <Playlist />
        </Box>
        <Route view={VIEWS.SONG}>
          <LibrarySongs />
        </Route>
        <Route view={VIEWS.ALBUM}>
          <LibraryAlbums />
        </Route>
      </Box>
    </Route>
  </Box>
);

export default App;
