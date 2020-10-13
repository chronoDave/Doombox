import React from 'react';
import PropTypes from 'prop-types';

// Core
import { Box } from '@material-ui/core';

import { AppBar } from '../AppBar';

// Utils
import { isMac } from '../../../../doombox-utils';

const App = ({ children }) => (
  <Box
    display="flex"
    flexDirection="column"
    overflow="hidden"
    height="100vh"
  >
    {!isMac && <AppBar />}
    {children}
  </Box>
);

App.propTypes = {
  children: PropTypes.node.isRequired
};

export default App;
