import React from 'react';
import { connect } from 'react-redux';
import { WINDOW } from '@doombox-utils/types';
import PropTypes from 'prop-types';

// Core
import { Hidden } from '../../components';

import { Player } from '../Player';
import { Playlist } from '../Playlist';
import { PlaylistTitle } from '../PlaylistTitle';
import { LibraryMenu } from '../LibraryMenu';
import { SearchLibrary } from '../SearchLibrary';
import { OverlayScan } from '../OverlayScan';
import { OverlaySettings } from '../OverlaySettings';
import { WindowButtons } from '../WindowButtons';
import { WindowIcon } from '../WindowIcon';
import { WindowNavigation } from '../WindowNavigation';
import { WindowTitle } from '../WindowTitle';
import { VirtualLibrary } from '../VirtualLibrary';
import { LibrarySearch } from '../LibrarySearch';

// Styles
import useAppStyles from './App.styles';

const App = ({ overlay, view }) => {
  const classes = useAppStyles();

  return (
    <div className={classes.root}>
      <Hidden platform="darwin">
        <div className={classes.window}>
          <WindowIcon />
          <WindowNavigation />
          <WindowTitle />
          <WindowButtons />
        </div>
      </Hidden>
      <div className={classes.body}>
        <div className={classes.controller}>
          <Player />
          <PlaylistTitle />
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
