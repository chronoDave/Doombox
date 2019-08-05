import React, { Fragment, useEffect } from 'react';
import {
  HashRouter,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Core
import { Sidebar } from '../Sidebar';

// Routes
import {
  PrivateRoutes,
  LoadingRoute,
  CreateProfileRoute
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

const App = ({ pendingCache, isCached }) => {
  useEffect(() => {
    getCachedProfile();
  }, []);

  useScrollbar();
  useSubscribeSystem();
  useSubscribeUser();
  useSubscribeLibrary();

  return (
    <HashRouter>
      <Switch>
        {pendingCache ? (
          <Fragment>
            <Route {...LoadingRoute} />
            <Redirect to={loadingPath} />
          </Fragment>
        ) : (
          isCached ? (
            <Fragment>
              <Sidebar />
              {PrivateRoutes.map(route => <Route key={route.key} {...route} />)}
              <Redirect to={homePath} />
            </Fragment>
          ) : (
            <Fragment>
              <Route {...CreateProfileRoute} />
              <Redirect to={createProfilePath} />
            </Fragment>
          )
        )}
      </Switch>
    </HashRouter>
  );
};

App.propTypes = {
  isCached: PropTypes.bool.isRequired,
  pendingCache: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  isCached: state.system.connectedCache,
  pendingCache: state.system.pendingCache
});

export default connect(
  mapStateToProps
)(App);
