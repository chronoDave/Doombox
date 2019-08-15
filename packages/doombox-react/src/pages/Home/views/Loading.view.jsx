import React from 'react';

// Core
import {
  Box,
  LinearProgress,
  Typography
} from '@material-ui/core';

// Hooks
import { useSubscribeMessage } from '../../../hooks';

const LoadingView = () => {
  const { current, total } = useSubscribeMessage();

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      p={8}
    >
      <Box
        width="100%"
        maxWidth={720}
      >
        <LinearProgress value={current / total * 100} variant="determinate" />
      </Box>
      <Typography>
        {`${current} / ${total}`}
      </Typography>
    </Box>
  );
};

export default LoadingView;
