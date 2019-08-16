import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Core
import { useRouter } from '../Router';

// Hooks
import {
  useScrollbar,
  useSubscribeSystem,
  useSubscribeUser,
  useSubscribeLibrary
} from '../../hooks';

// Pages
import * as Pages from '../../pages';

// Paths
import * as Paths from '../../paths';

// Validation
import { propUser } from '../../validation/propTypes';

const App = ({ profile, noCache }) => {
  const { path, setPath } = useRouter();

  useScrollbar();
  useSubscribeSystem();
  useSubscribeUser();
  useSubscribeLibrary();

  useEffect(() => {
    if (profile) setPath(Paths.HOME_PATH);
  }, [profile]);

  useEffect(() => {
    if (noCache) setPath(Paths.OFFLINE_PATH);
  }, [noCache]);

  if (path === Paths.HOME_PATH) return <Pages.HomePage />;
  if (path === Paths.SETTINGS_PATH) return <Pages.SettingsPage />;
  if (path === Paths.CREATE_PATH) return <Pages.CreateProfilePage />;
  if (path === Paths.OFFLINE_PATH) return <Pages.OfflinePage />;
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
