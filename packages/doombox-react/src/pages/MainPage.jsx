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

// Utils
import { isValidView } from '../utils';
import { MAIN_VIEWS } from '../utils/const';

const MainPage = ({ isScanning, fetchAllLibrary, fetchAllPlaylist }) => {
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
    fetchAllPlaylist();
  }, []);

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
      {useMemo(() => <ModalScanning open={open} onClose={() => setOpen(false)} />, [open])}
    </Fragment>
  );
};

MainPage.propTypes = {
  isScanning: PropTypes.bool.isRequired,
  fetchAll: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isScanning: state.system.isScanning
});

const mapDispatchToProps = dispatch => ({
  fetchAllLibrary: () => dispatch(fetchLibrary()),
  fetchAllPlaylist: ids => dispatch(fetchPlaylist(ids))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainPage);
