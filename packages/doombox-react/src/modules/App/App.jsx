import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

// Core
import { withStyles } from '@material-ui/core/styles';

import AppBar from './AppBar.private';

// Style
import { AppStyles } from './App.style';

// Hooks
import { useGlobalStyles } from '../../hooks';

const App = ({ classes, children }) => {
  useGlobalStyles();

  return (
    <Fragment>
      <AppBar />
      <div className={classes.root}>
        {children}
      </div>
    </Fragment>
  );
};

App.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string.isRequired
  }).isRequired,
  children: PropTypes.element.isRequired
};

export default withStyles(AppStyles)(App);
