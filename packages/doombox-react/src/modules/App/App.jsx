import React, { Fragment } from 'react';
import clsx from 'clsx';

// Core
import { AppBar } from '../AppBar';
import { Player } from '../Player';
import { Playlist } from '../Playlist';
import { Library } from '../Library';

// Utils
import { isMac } from '../../../../doombox-utils';

// Styles
import { useAppStyles } from './App.styles';

const App = () => {
  const classes = useAppStyles();

  return (
    <Fragment>
      {!isMac && <AppBar />}
      <div className={clsx(classes.root, { [classes.appBar]: !isMac })} />
      <div className={classes.player}>
        <Player />
        <Playlist />
      </div>
      <div className={classes.library}>
        <Library />
      </div>
    </Fragment>
  );
};

export default App;
