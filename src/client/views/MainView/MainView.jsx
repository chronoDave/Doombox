import React, { useEffect } from 'react';
import { IPC, VIEWS } from '@doombox-utils/types';

// Core
import { Route } from '../../components';
import {
  Player,
  Playlist,
  LibraryAlbums,
  LibrarySongs
} from '../../modules';

// Actions
import { ipcFind } from '../../actions';

// Styles
import useMainViewStyles from './MainView.styles';

const MainView = () => {
  const classes = useMainViewStyles();

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
        'metadata.disc',
        'metadata.track',
        'metadata.year',
        'covers',
        '_id',
        '_albumId',
        '_labelId'
      ]
    });
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

export default MainView;
