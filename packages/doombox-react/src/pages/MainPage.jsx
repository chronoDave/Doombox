import React, {
  Fragment,
  createElement,
  useState,
  useMemo,
  useEffect
} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Core
import { useTheme } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';

import {
  BackgroundFade,
  BackgroundImage
} from '../components/Background';
import { ModalScanning } from '../components/Modal';

// Modules
import {
  Sidebar,
  Sidepanel
} from '../modules';

// Hooks
import { useRoute } from '../hooks';

// Api
import {
  fetchLibrary,
  fetchPlaylist
} from '../api';

// Views
import * as Views from '../views/Main';

// Validation
import { propSong } from '../validation/propTypes';

// Utils
import { isValidView } from '../utils';
import { MAIN_VIEWS } from '../utils/const';

const MainPage = props => {
  const {
    isScanning,
    fetchAllLibrary,
    fetchAllPlaylist,
    playlist
  } = props;
  const [open, setOpen] = useState(isScanning);
  const { view, setView } = useRoute();
  const {
    component: {
      sidebar,
      sidepanel
    }
  } = useTheme();

  useEffect(() => {
    setOpen(isScanning);
  }, [isScanning]);

  useEffect(() => {
    fetchAllLibrary();
  }, []);

  useEffect(() => {
    fetchAllPlaylist(playlist);
  }, [playlist]);

  useEffect(() => {
    if (!isValidView(MAIN_VIEWS, view)) setView(MAIN_VIEWS.SONG);
  }, [view]);

  return (
    <Fragment>
      <Sidebar />
      <Sidepanel />
      {useMemo(() => (
        <Box marginLeft={`${sidebar + sidepanel}px`}>
          <BackgroundImage />
          <BackgroundFade />
          <Box>
            {isValidView(MAIN_VIEWS, view) ? (
              createElement(Views[`Main${view}View`])
            ) : null}
          </Box>
        </Box>
      ), [view])}
      <ModalScanning open={open} onClose={() => setOpen(false)} />
    </Fragment>
  );
};

MainPage.propTypes = {
  isScanning: PropTypes.bool.isRequired,
  fetchAllLibrary: PropTypes.func.isRequired,
  fetchAllPlaylist: PropTypes.func.isRequired,
  playlist: PropTypes.arrayOf(propSong)
};

MainPage.defaultProps = {
  playlist: []
};

const mapStateToProps = state => ({
  playlist: state.profile.user.playlist,
  isScanning: state.library.scanning
});

const mapDispatchToProps = dispatch => ({
  fetchAllLibrary: () => dispatch(fetchLibrary()),
  fetchAllPlaylist: ids => dispatch(fetchPlaylist(ids))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainPage);
