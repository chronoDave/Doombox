import React, { useEffect } from 'react';
import {
  HashRouter,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Routes
import {
  MainRoutes,
  LoadingRoute
} from '../../routes';

// Hooks
import {
  useScrollbar,
  useSubscribeSystem,
  useSubscribeUser,
  useSubscribeLibrary
} from '../../hooks';

// Paths
import {
  homePath,
  loadingPath,
  createProfilePath
} from '../../paths';

// Actions
import { getCachedProfile } from '../../api/userApi';

const App = ({ pending, hasProfile }) => {
  useEffect(() => {
    getCachedProfile();
  }, []);

  useScrollbar();
  useSubscribeSystem();
  useSubscribeUser();
  useSubscribeLibrary();

  return (
    <HashRouter>
      {pending ? (
        <Switch>
          <Route {...LoadingRoute} />
          <Redirect to={loadingPath} />
        </Switch>
      ) : (
        <Switch>
          {MainRoutes.map(route => <Route key={route.key} {...route} />)}
          <Redirect to={hasProfile ? homePath : createProfilePath} />
        </Switch>
      )}
    </HashRouter>
  );
};

App.propTypes = {
  hasProfile: PropTypes.bool.isRequired,
  pending: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  hasProfile: state.system.connectedCache,
  pending: state.system.pendingCache
});

export default connect(
  mapStateToProps
)(App);
