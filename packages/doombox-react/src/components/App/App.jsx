import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Core
import { useRoute } from '../Router';

// Hooks
import {
  useScrollbar,
  useSubscribeSystem,
  useSubscribeUser
} from '../../hooks';

// Pages
import * as Pages from '../../pages';

// Const
import { PATHS } from '../../constants';

// Validation
import { propUser } from '../../validation/propTypes';

const App = ({ profile, connected }) => {
  const { path, setPath } = useRoute();

  useScrollbar();
  useSubscribeSystem();
  useSubscribeUser();

  useEffect(() => {
    if (!profile && connected) setPath(PATHS.OFFLINE);
  }, [profile, connected]);

  useEffect(() => {
    if (connected) {
      setPath(PATHS.HOME);
    } else {
      setPath(PATHS.CREATE);
    }
  }, [connected]);

  if (path === PATHS.CREATE) return <Pages.CreateProfilePage />;
  if (path === PATHS.OFFLINE) return <Pages.OfflinePage />;
  if (path === PATHS.HOME) return <Pages.MainPage />;
  return <Pages.LoadingPage />;
};

App.propTypes = {
  profile: propUser,
  connected: PropTypes.bool.isRequired
};

App.defaultProps = {
  profile: null
};

const mapStateToProps = state => ({
  profile: state.profile.user,
  connected: state.system.connected
});

export default connect(
  mapStateToProps
)(App);
