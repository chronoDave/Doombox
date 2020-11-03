import React, { useEffect } from 'react';
import { IPC, VIEWS } from '@doombox-utils/types';

// Core
import { Route } from '../../components';

import { Player } from '../Player';
import { Playlist } from '../Playlist';
import { LibrarySongs } from '../LibrarySongs';
import { LibraryAlbums } from '../LibraryAlbums';

// Actions
import { ipcFind } from '../../actions';

// Styles
import useMainStyles from './Main.styles';

const Main = () => {
  const classes = useMainStyles();

  useEffect(() => {
    ipcFind(IPC.CHANNEL.IMAGE, {}, { projection: ['file', '_id'] });
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
    <div className={classes.root}>
      <div className={classes.player}>
        <Player />
        <Playlist />
      </div>
      <Route view={VIEWS.SONG}>
        <LibrarySongs />
      </Route>
      <Route view={VIEWS.ALBUM}>
        <LibraryAlbums />
      </Route>
    </div>
  );
};

export default Main;
