import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

// Core
import AppBar from './AppBar.private';

// Style
import { useAppStyles } from './App.style';

// Hooks
import { useGlobalStyles } from '../../hooks';

const App = ({ children }) => {
  useGlobalStyles();
  const classes = useAppStyles();

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
  children: PropTypes.element.isRequired
};

export default App;
