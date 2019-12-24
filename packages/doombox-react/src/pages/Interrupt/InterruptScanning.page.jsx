import React from 'react';

// Core
import {
  Box,
  Typography
} from '@material-ui/core';

import { ProgressScanning } from '../../components';

const InterruptScanningPage = () => (
  <Box
    display="flex"
    flexDirection="column"
    alignItems="center"
    justifyContent="center"
    height="100%"
  >
    <Box display="flex" flexDirection="column" alignItems="center">
      <Typography variant="h6">
        Scanning folders...
      </Typography>
      <Typography paragraph>
        Please be patient, this can take a while
      </Typography>
    </Box>
    <Box mb={8} width="100%">
      <ProgressScanning disableAnimation />
    </Box>
  </Box>
);

export default InterruptScanningPage;
