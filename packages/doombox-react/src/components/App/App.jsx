import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Core
import { useRoute } from '../Router';

// Hooks
import {
  useScrollbar,
  useSubscribeSystem,
  useSubscribeUser,
  useSubscribeLibrary
} from '../../hooks';

// Pages
import * as Pages from '../../pages';

// Const
import { PATHS } from '../../const';

// Validation
import { propUser } from '../../validation/propTypes';

const App = ({ profile, noCache }) => {
  const { path, setPath } = useRoute();

  useScrollbar();
  useSubscribeSystem();
  useSubscribeUser();
  useSubscribeLibrary();

  useEffect(() => {
    if (profile) setPath(PATHS.HOME);
  }, [profile]);

  useEffect(() => {
    if (noCache) setPath(PATHS.OFFLINE);
  }, [noCache]);

  if (path === PATHS.HOME) return <Pages.MainPage />;
  if (path === PATHS.CREATE) return <Pages.CreateProfilePage />;
  if (path === PATHS.OFFLINE) return <Pages.OfflinePage />;
  return <Pages.LoadingPage />;
};

App.propTypes = {
  profile: propUser,
  noCache: PropTypes.bool.isRequired
};

App.defaultProps = {
  profile: null,
};

const mapStateToProps = state => ({
  profile: state.profile.user,
  noCache: state.system.errorCache
});

export default connect(
  mapStateToProps
)(App);
