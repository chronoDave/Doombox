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
    if (profile) setPath(PATHS.MAIN);
  });

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
  cache: state.system.remote,
  error: state.system.error,
  profile: state.profile.user
});

export default connect(
  mapStateToProps
)(App);
