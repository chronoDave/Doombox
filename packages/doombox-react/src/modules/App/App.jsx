import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

// Core
import { Box } from '@material-ui/core';

import AppIcon from './AppIcon/AppIcon.private';
import AppMenu from './AppMenu/AppMenu.private';
import AppTitle from './AppTitle/AppTitle.private';
import AppControls from './AppControls/AppControls.private';

// Styles
import { useAppStyles } from './App.styles';

const App = ({ children }) => {
  const classes = useAppStyles();

  return (
    <Fragment>
      <div className={classes.barRoot}>
        <AppIcon />
        <AppMenu />
        <AppTitle />
        <AppControls />
      </div>
      <div className={classes.root}>
        <Box width="100%" height="100%" overflow="auto">
          {children}
        </Box>
      </div>
    </Fragment>
  );
};

App.propTypes = {
  children: PropTypes.node.isRequired
};

export default App;
