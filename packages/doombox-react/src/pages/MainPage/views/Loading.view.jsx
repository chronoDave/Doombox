import React from 'react';

// Core
import {
  Box,
  LinearProgress
} from '@material-ui/core';

import { Typography } from '../../../components/Typography';

// Hooks
import { useSubscribeMessage } from '../../../hooks';

export const LoadingView = () => {
  const { current, total } = useSubscribeMessage();

  const progress = (current && total) ? current / total * 100 : 0;

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="100%"
      height="100vh"
    >
      <Box
        p={4}
        maxWidth={600}
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <LinearProgress variant="determinate" value={progress} />
        <Typography paragraph>{`${current || 0} / ${total || 0}`}</Typography>
      </Box>
    </Box>
  );
};

export default LoadingView;
