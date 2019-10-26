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
import { Sidebar } from '../modules';

// Hooks
import { useRoute } from '../hooks';

// Api
import { fetchLibrary } from '../api';

// Views
import * as Views from '../views/Main';

// Utils
import { isValidView } from '../utils';
import { MAIN_VIEWS } from '../utils/const';

const MainPage = ({ isScanning, fetchAll }) => {
  const [open, setOpen] = useState(isScanning);
  const { component } = useTheme();
  const { view, setView } = useRoute();

  useEffect(() => {
    setOpen(isScanning);
  }, [isScanning]);

  useEffect(() => {
    fetchAll();
  }, []);

  useEffect(() => {
    if (!isValidView(MAIN_VIEWS, view)) setView(MAIN_VIEWS.SONG);
  }, [view]);

  return (
    <Fragment>
      {useMemo(() => <Sidebar />, [])}
      {useMemo(() => (
        <Box marginLeft={`${component.sidebar}px`}>
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
  fetchAll: () => dispatch(fetchLibrary())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainPage);
