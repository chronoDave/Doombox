import React from 'react';

// Core
import { Box } from '@material-ui/core';

const ErrorPage = () => (
  <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    height="100vh"
  >
    <Box
      display="flex"
      flexDirection="column"
      maxWidth={720}
      p={2}
    >
      Error Page
    </Box>
  </Box>
);

export default ErrorPage;
