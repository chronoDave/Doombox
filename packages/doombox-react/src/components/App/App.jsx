import React, {
  useEffect,
  useMemo
} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Api
import { readUser } from '../../api';

// Hooks
import {
  useScrollbar,
  useRoute
} from '../../hooks';

// Pages
import * as Pages from '../../pages';

// Utils
import {
  ROUTES,
  LANDING_VIEWS
} from '../../utils/const';

// Validation
import {
  propCache,
  propUser,
  propError
} from '../../validation/propTypes';

const App = props => {
  const {
    cache,
    error,
    profile,
    fetchUser
  } = props;
  const { route, setRoute, setView } = useRoute();
  useScrollbar();

  useEffect(() => {
    if (cache && cache._id) {
      fetchUser(cache._id);
    }
    if (!cache && error) {
      setView(LANDING_VIEWS.CREATE);
      setRoute(ROUTES.LANDING);
    }
  }, [cache, error]);

  useEffect(() => {
    if (profile) setRoute(ROUTES.MAIN);
  }, [profile]);

  return useMemo(() => {
    if (route === ROUTES.ERROR) return <Pages.ErrorPage />;
    if (route === ROUTES.LANDING) return <Pages.LandingPage />;
    if (route === ROUTES.MAIN) return <Pages.MainPage />;
    return <Pages.LoadingPage />;
  }, [route]);
};

App.propTypes = {
  cache: propCache,
  error: propError,
  profile: propUser,
  fetchUser: PropTypes.func.isRequired
};

App.defaultProps = {
  cache: null,
  error: null,
  user: null
};

const mapStateToProps = state => ({
  cache: state.system.cache,
  error: state.system.error,
  profile: state.profile.user
});

const mapDispatchToProps = dispatch => ({
  fetchUser: _id => dispatch(readUser(_id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
