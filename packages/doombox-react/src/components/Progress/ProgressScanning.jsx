import React, { useRef } from 'react';
import throttle from 'lodash.throttle';

// Core
import {
  Box,
  LinearProgress
} from '@material-ui/core';

import { Typography } from '../Typography';

// Hooks
import { useIpc } from '../../hooks';

// Utils
import { HOOK } from '../../utils/const';

// Styles
import { useProgressStyles } from './Progress.style';

const ProgressScanning = () => {
  const { file, current, size } = useIpc(HOOK.IPC.MESSAGE);
  const classes = useProgressStyles();

  const throttledValue = useRef(throttle(
    (cur, max) => {
      if (!cur || !max) return 0;
      return (Math.round(cur / max * 100));
    }, 100
  )).current;

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <Box
        display="flex"
        width="100%"
        alignItems="center"
        mb={1}
      >
        <LinearProgress
          value={throttledValue(current, size)}
          variant="determinate"
          classes={{ root: classes.root }}
          color="secondary"
        />
        <Typography>
          {`${throttledValue(current, size)}%`}
        </Typography>
      </Box>
      <Typography
        variant="caption"
        align="center"
        clamp={2}
      >
        {file || 'Loading...'}
      </Typography>
    </Box>
  );
};

export default ProgressScanning;
