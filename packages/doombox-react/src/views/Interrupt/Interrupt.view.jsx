import { ipcRenderer } from 'electron';

import React, { useState, useEffect } from 'react';

// Core
import { Box, LinearProgress } from '@material-ui/core';

import { Typography } from '../../components';

// Hooks
import { useTranslation } from '../../hooks';

// Types
import { IPC } from '../../../../doombox-types';

// Utils
import { formatTime } from '../../../../doombox-utils';

// Styles
import { useInterruptStyles } from './Interrupt.styles';

const InterruptView = () => {
  const [progress, setProgress] = useState({ file: 'aaaaaaaaaaaaa', index: 0, total: 0 });
  const [count, setCount] = useState(0);

  const classes = useInterruptStyles();
  const { t } = useTranslation();

  useEffect(() => {
    ipcRenderer.on(IPC.CHANNEL.INTERRUPT, (event, payload) => {
      setProgress(payload.data);
    });

    return () => ipcRenderer.removeAllListeners(IPC.CHANNEL.INTERRUPT);
  }, []);

  useEffect(() => {
    const counter = setInterval(() => setCount(newCount => newCount + 1), 1000);

    return () => clearInterval(counter);
  }, []);

  const percentage = progress.total > 0 ?
    Math.round((progress.index / progress.total) * 100) :
    0;

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100%"
      p={2}
    >
      <Box display="flex" flexDirection="column" mb={1}>
        <Typography align="center">
          {t('title.scanning_folders')}
        </Typography>
        <Typography paragraph variant="body2">
          {t('description.scanning_folders')}
        </Typography>
        <Typography variant="body2" align="center">
          {`${formatTime(count)}`}
        </Typography>
      </Box>
      <Box display="flex" alignItems="center" width="100%">
        <LinearProgress
          classes={{ root: classes.progressRoot }}
          value={percentage}
          variant="determinate"
        />
        <Typography variant="body2">
          {`${percentage}%`}
        </Typography>
      </Box>
      <Typography variant="caption" clamp={4}>
        {progress.file}
      </Typography>
    </Box>
  );
};

export default InterruptView;
