import React from 'react';
import { connect } from 'react-redux';
import { WINDOW } from '@doombox-utils/types';
import PropTypes from 'prop-types';

// Core
import { Hidden } from '../../components';

import { Player } from '../Player';
import { PlayerSlider } from '../PlayerSlider';
import { PlayerControls } from '../PlayerControls';
import { Playlist } from '../Playlist';
import { PlaylistTitle } from '../PlaylistTitle';
import { ViewLibrary } from '../ViewLibrary';
import { LibraryMenu } from '../LibraryMenu';
import { LibrarySearch } from '../LibrarySearch';
import { OverlayScan } from '../OverlayScan';
import { OverlaySettings } from '../OverlaySettings';
import { WindowButtons } from '../WindowButtons';
import { WindowIcon } from '../WindowIcon';
import { WindowMenu } from '../WindowMenu';
import { WindowTitle } from '../WindowTitle';
import { ViewSearch } from '../ViewSearch';

// Styles
import useAppStyles from './App.styles';

const App = ({ overlay, view }) => {
  const classes = useAppStyles();

  return (
    <div className={classes.root}>
      <Hidden platform="darwin">
        <div className={classes.window}>
          <WindowIcon />
          <WindowMenu />
          <WindowTitle />
          <WindowButtons />
        </div>
      </Hidden>
      <div className={classes.body}>
        <div className={classes.controller}>
          <Player />
          <PlayerSlider />
          <Hidden on={({ create }) => create('minWidth', 'sm')}>
            <PlayerControls className={classes.controls} />
          </Hidden>
          <PlaylistTitle />
          <Playlist />
        </div>
        <div className={classes.library}>
          <div className={classes.libraryHeader}>
            <LibrarySearch />
            <LibraryMenu />
          </div>
          {view === WINDOW.VIEW.LIBRARY && <ViewLibrary />}
          {view === WINDOW.VIEW.SEARCH && <ViewSearch />}
        </div>
        <OverlayScan open={overlay === WINDOW.OVERLAY.SCAN} />
        <OverlaySettings open={overlay === WINDOW.OVERLAY.SETTINGS} />
      </div>
    </div>
  );
};

App.defaultProps = {
  overlay: null
};

App.propTypes = {
  overlay: PropTypes.oneOf(Object.values(WINDOW.OVERLAY)),
  view: PropTypes.oneOf(Object.values(WINDOW.VIEW)).isRequired
};

const mapStateToProps = state => ({
  overlay: state.window.overlay,
  view: state.window.view
});

export default connect(
  mapStateToProps
)(App);
