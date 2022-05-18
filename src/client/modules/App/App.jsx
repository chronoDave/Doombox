import React from 'react';
import { connect } from 'react-redux';
import { WINDOW } from '@doombox-utils/types';
import PropTypes from 'prop-types';

// Core
import {
  WindowBar,
  Player,
  Playlist,
  LibraryMenu,
  SearchLibrary,
  OverlayScan,
  OverlaySettings,
  VirtualLibrary,
  LibrarySearch,
} from '..';

// Styles
import useAppStyles from './App.styles';

const App = ({ overlay, view }) => {
  const classes = useAppStyles();

  return (
    <div className={classes.root}>
      <WindowBar />
      <div className={classes.body}>
        <div className={classes.controller}>
          <Player />
          <Playlist />
        </div>
        <div className={classes.library}>
          <div className={classes.header}>
            <SearchLibrary />
            <LibraryMenu />
          </div>
          {view === WINDOW.VIEW.LIBRARY && <VirtualLibrary />}
          {view === WINDOW.VIEW.SEARCH && <LibrarySearch />}
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
