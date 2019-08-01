import React, { Fragment } from 'react';
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
  OfflineRoute,
  CreateProfileRoute
} from '../../routes';

// Hooks
import {
  useScrollbar,
  useSubscribeUser,
  useSubscribeSystem
} from '../../hooks';

// Paths
import {
  homePath,
  loadingPath,
  offlinePath,
  createProfilePath
} from '../../paths';


const App = ({
  pendingCache,
  isConnected,
  isCached
}) => {
  useScrollbar();
  useSubscribeUser();
  useSubscribeSystem();

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
            isConnected ? (
              <Fragment>
                <Sidebar />
                {PrivateRoutes.map(route => <Route key={route.key} {...route} />)}
                <Redirect to={homePath} />
              </Fragment>
            ) : (
              <Fragment>
                <Route {...OfflineRoute} />
                <Redirect to={offlinePath} />
              </Fragment>
            )
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
  pendingCache: PropTypes.bool.isRequired,
  isConnected: PropTypes.bool.isRequired,
  isCached: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  pendingCache: state.system.pendingCache,
  isConnected: state.system.connectedDatabase,
  isCached: state.system.connectedCache
});

export default connect(
  mapStateToProps
)(App);
