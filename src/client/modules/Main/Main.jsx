import React, { useEffect } from 'react';
import { IPC, VIEWS } from '@doombox-utils/types';

// Core
import { Box } from '@material-ui/core';

import { Route } from '../../components';

import { Player } from '../Player';
import { Playlist } from '../Playlist';
import { LibrarySongs } from '../LibrarySongs';
import { LibraryAlbums } from '../LibraryAlbums';

// Actions
import { ipcFind } from '../../actions';

const Main = () => {
  useEffect(() => {
    ipcFind(IPC.CHANNEL.IMAGE);
    ipcFind(IPC.CHANNEL.LIBRARY, {}, {
      projection: [
        'file',
        'metadata.title',
        'metadata.titlelocalized',
        'metadata.artist',
        'metadata.artistlocalized',
        'metadata.album',
        'metadata.albumlocalized',
        'metadata.albumartist',
        'metadata.albumartistlocalized',
        'metadata.cdid',
        'metadata.date',
        'metadata.disk',
        'metadata.track',
        'metadata.year',
        'images',
        '_id',
        '_albumId',
        '_labelId'
      ]
    });
    ipcFind(IPC.CHANNEL.ALBUM);
    ipcFind(IPC.CHANNEL.LABEL);
  }, []);

  return (
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
  );
};

export default Main;
