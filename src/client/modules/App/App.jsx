import React from 'react';
import { connect } from 'react-redux';
import { WINDOWS } from '@doombox-utils/types';
import PropTypes from 'prop-types';

// Core
import { AppBar } from '../AppBar';
import { Player } from '../Player';
import { Playlist } from '../Playlist';
import { PlaylistTitle } from '../PlaylistTitle';
import { Library } from '../Library';
import { LibraryBar } from '../LibraryBar';
import { OverlayScan } from '../OverlayScan';
import { OverlaySettings } from '../OverlaySettings';

// Styles
import useAppStyles from './App.styles';

const App = ({ overlay }) => {
  const classes = useAppStyles();

  return (
    <div className={classes.root}>
      {process.platform !== 'darwin' && <AppBar />}
      <div className={classes.body}>
        <div className={classes.player}>
          <Player />
          <div className={classes.playlist}>
            <PlaylistTitle />
            <Playlist />
          </div>
        </div>
        <div className={classes.library}>
          <LibraryBar />
          <Library />
        </div>
        <OverlayScan open={overlay === WINDOWS.OVERLAY.SCAN} />
        <OverlaySettings open={overlay === WINDOWS.OVERLAY.SETTINGS} />
      </div>
    </div>
  );
};

App.defaultProps = {
  overlay: null
};

App.propTypes = {
  overlay: PropTypes.oneOf(Object.values(WINDOWS.OVERLAY))
};

const mapStateToProps = state => ({
  overlay: state.window.overlay
});

export default connect(
  mapStateToProps
)(App);
