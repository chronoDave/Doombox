import React, { createElement, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Core
import {
  BackgroundFade,
  BackgroundImage
} from '../../components/Background';
import { useRouter } from '../../components/Provider';

// Modules
import { Sidebar } from '../../modules';

// Views
import * as Views from './views';

// Utils
import { PATHS, MAIN_VIEWS } from '../../utils/const';

// Validation
import { propUser } from '../../validation/propTypes';

// Style
import { useMainPageStyle } from './MainPage.style';

const MainPage = ({ profile, pending }) => {
  const { view, setPath, setView } = useRouter();
  const classes = useMainPageStyle();

  useEffect(() => {
    if (pending) setView(MAIN_VIEWS.LOADING);
  });

  if (!profile) {
    setPath(PATHS.CREATE);
    return null;
  }
  return (
    <div className={classes.root}>
      <BackgroundImage />
      <BackgroundFade />
      <Sidebar />
      {createElement(Views[`${view}View`])}
    </div>
  );
};

MainPage.propTypes = {
  profile: propUser,
  pending: PropTypes.bool.isRequired
};

MainPage.defaultProps = {
  profile: null
};

const mapStateToProps = state => ({
  profile: state.profile.user,
  pending: state.library.pending
});

export default connect(
  mapStateToProps
)(MainPage);
