import { ipcRenderer } from 'electron';

import React, { useState, useEffect, useMemo } from 'react';
import { formatTime } from '@doombox-utils';
import { IPC } from '@doombox-utils/types';

// Core
import { Typography, LoaderBar } from '../../components';

// Hooks
import { useTranslation } from '../../hooks';

// Styles
import useInterruptViewStyles from './InterruptView.styles';

const InterruptView = () => {
  const [progress, setProgress] = useState({ file: null, index: 0, total: 10 });
  const [count, setCount] = useState(0);

  const classes = useInterruptViewStyles();
  const { t } = useTranslation();

  useEffect(() => {
    ipcRenderer.on(
      IPC.CHANNEL.INTERRUPT,
      (event, payload) => setProgress(payload.data)
    );

    return () => ipcRenderer.removeAllListeners(IPC.CHANNEL.INTERRUPT);
  }, []);

  useEffect(() => {
    const counter = setInterval(() => setCount(newCount => newCount + 1), 1000);

    return () => clearInterval(counter);
  }, []);

  const value = progress.total > 0 ?
    Math.round((progress.index / progress.total) * 100) :
    0;

  // Should only update on counter update
  const estimate = useMemo(() => {
    if (value === 0) return '\u221e';
    return formatTime(count / (value / 100));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  return (
    <div className={classes.root}>
      <div className={classes.title}>
        <Typography align="center">
          {t('title.scanning_files', { transform: 'capitalize' })}
        </Typography>
        <Typography variant="subtitle">
          {t('description.scanning_files', { transform: 'capitalize' })}
        </Typography>
        <Typography align="center" className={classes.time}>
          {`${formatTime(count)} / ${estimate}`}
        </Typography>
      </div>
      <div className={classes.progress}>
        <LoaderBar value={value} />
        <Typography className={classes.progressLabel}>
          {`${value}%`}
        </Typography>
      </div>
      {progress.file && (
        <Typography
          variant="caption"
          clamp={4}
          className={classes.description}
        >
          {progress.file}
        </Typography>
      )}
    </div>
  );
};

export default InterruptView;
