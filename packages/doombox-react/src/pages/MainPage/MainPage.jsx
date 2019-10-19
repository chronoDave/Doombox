import React, {
  Fragment,
  createElement,
  useEffect,
  useState
} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Core
import { Box } from '@material-ui/core';

import {
  BackgroundFade,
  BackgroundImage
} from '../../components/Background';
import { useRouter } from '../../components/Provider';
import { ModalScanning } from '../../components/Modal';

// Modules
import { Sidebar } from '../../modules';

// Views
import * as Views from './views';

// Utils
import { PATHS } from '../../utils/const';

// Validation
import { propUser } from '../../validation/propTypes';

// Style
import { useMainPageStyle } from './MainPage.style';

const MainPage = ({ profile, scanning }) => {
  const [open, setOpen] = useState(false);
  const { view, setPath } = useRouter();
  const classes = useMainPageStyle();

  useEffect(() => {
    if (!profile) setPath(PATHS.CREATE);
  }, [profile]);

  useEffect(() => {
    setOpen(scanning);
  }, [scanning]);

  if (!profile) return null;
  return (
    <Fragment>
      <div className={classes.root}>
        <BackgroundImage />
        <BackgroundFade />
        <Sidebar />
        <Box flexGrow={1} height="100vh">
          {createElement(Views[`${view}View`])}
        </Box>
      </div>
      <ModalScanning open={open} onClose={() => setOpen(false)} />
    </Fragment>
  );
};

MainPage.propTypes = {
  profile: propUser,
  scanning: PropTypes.bool.isRequired
};

MainPage.defaultProps = {
  profile: null
};

const mapStateToProps = state => ({
  profile: state.profile.user,
  scanning: state.system.scanning
});

export default connect(
  mapStateToProps
)(MainPage);
