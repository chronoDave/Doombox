import { ipcRenderer } from 'electron';

import React, { useState, useEffect } from 'react';
import { formatTime } from '@doombox-utils';
import { IPC } from '@doombox-utils/types';

// Core
import { Typography, LinearProgress } from '../../components';

// Hooks
import { useTranslation } from '../../hooks';

// Styles
import useInterruptStyles from './Interrupt.styles';

const Interrupt = () => {
  const [progress, setProgress] = useState({ file: '', index: 0, total: 0 });
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

  const value = progress.total > 0 ?
    Math.round((progress.index / progress.total) * 100) :
    0;

  return (
    <div className={classes.root}>
      <div className={classes.title}>
        <Typography align="center">
          {t('title.scanning_folders')}
        </Typography>
        <Typography>
          {t('description.scanning_folders')}
        </Typography>
        <Typography align="center">
          {`${formatTime(count)}`}
        </Typography>
      </div>
      <div className={classes.progress}>
        <LinearProgress value={value} />
        <Typography className={classes.progressLabel}>
          {`${value}%`}
        </Typography>
      </div>
      <Typography variant="caption" clamp={4}>
        {progress.file}
      </Typography>
    </div>
  );
};

export default Interrupt;
