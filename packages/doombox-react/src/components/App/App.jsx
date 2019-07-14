import React from 'react';
import {
  BrowserRouter,
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
  PublicRoutes,
  PrivateRoutes
} from '../../routes';

// Paths
import { homePath } from '../../paths';

const App = ({ hasProfile }) => (
  <BrowserRouter>
    <Sidebar />
    <Switch>
      {hasProfile && (
        PrivateRoutes.map(route => <Route key={route.key} {...route} />)
      )}
      {PublicRoutes.map(route => <Route key={route.key} {...route} />)}
      <Redirect to={homePath} />
    </Switch>
  </BrowserRouter>
);

App.propTypes = {
  hasProfile: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  hasProfile: state.profile.cache
});

export default connect(
  mapStateToProps
)(App);
