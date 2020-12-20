import React from 'react';
import { connect } from 'react-redux';
import { WINDOWS } from '@doombox-utils/types';
import PropTypes from 'prop-types';

// Core
import { Hidden } from '../../components';

import { AppBar } from '../AppBar';
import { Player } from '../Player';
import { PlayerSlider } from '../PlayerSlider';
import { PlayerControls } from '../PlayerControls';
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
      <Hidden platform="darwin">
        <AppBar />
      </Hidden>
      <div className={classes.body}>
        <div className={classes.controller}>
          <Player />
          <PlayerSlider />
          <Hidden on={({ create, values, queries }) => create(queries.minWidth, values.sm)}>
            <PlayerControls />
          </Hidden>
          <PlaylistTitle />
          <Playlist />
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
