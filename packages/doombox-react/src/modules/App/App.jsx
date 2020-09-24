import React, { Fragment } from 'react';
import clsx from 'clsx';
import { isMac } from '@doombox/utils';
import PropTypes from 'prop-types';

// Core
import { Box } from '@material-ui/core';

import { AppBar } from '../AppBar';

// Styles
import { useAppStyles } from './App.styles';

const App = ({ children }) => {
  const classes = useAppStyles();

  return (
    <Fragment>
      {!isMac && <AppBar />}
      <div className={clsx(classes.root, { [classes.appBar]: !isMac })}>
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
