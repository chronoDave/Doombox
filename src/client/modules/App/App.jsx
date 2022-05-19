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

import './App.scss';

const App = ({ overlay, view }) => (
  <div className="App">
    <WindowBar />
    <div className="body">
      <div className="controller">
        <Player />
        <Playlist />
      </div>
      <div className="library">
        <div className="header">
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
