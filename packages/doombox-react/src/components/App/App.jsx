import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Core
import { useRouter } from '../Provider';

// Hooks
import {
  useScrollbar,
  useSubscribeSystem,
  useSubscribeUser
} from '../../hooks';

// Pages
import * as Pages from '../../pages';

// Validation
import {
  propError,
  propUser
} from '../../validation/propTypes';

// Utils
import { PATHS } from '../../utils/const';

const App = props => {
  const {
    pending,
    pendingLibrary,
    cache,
    error,
    profile
  } = props;
  const { path, setPath } = useRouter();

  useScrollbar();
  useSubscribeSystem();
  useSubscribeUser();

  useEffect(() => {
    if (pending) setPath(PATHS.PENDING);
  }, [pending]);

  useEffect(() => {
    if (profile && !pendingLibrary) setPath(PATHS.MAIN);
  }, [profile, pendingLibrary]);

  useEffect(() => {
    if (error) {
      if (cache) {
        setPath(PATHS.ERROR);
      } else {
        setPath(PATHS.CREATE);
      }
    }
  }, [error, cache]);

  if (path === PATHS.PENDING) return <Pages.LoadingPage />;
  if (path === PATHS.ERROR) return <Pages.ErrorPage />;
  if (path === PATHS.CREATE) return <Pages.CreateProfilePage />;
  if (path === PATHS.MAIN) return <Pages.MainPage />;
  return <Pages.LoadingPage />;
};

App.propTypes = {
  pending: PropTypes.bool.isRequired,
  pendingLibrary: PropTypes.bool.isRequired,
  cache: PropTypes.bool.isRequired,
  profile: propUser,
  error: propError
};

App.defaultProps = {
  error: null,
  profile: null
};

const mapStateToProps = state => ({
  pending: state.system.pending,
  pendingLibrary: state.library.pending,
  cache: state.system.remote,
  error: state.system.error,
  profile: state.profile.user
});

export default connect(
  mapStateToProps
)(App);
