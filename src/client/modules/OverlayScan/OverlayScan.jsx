import { ipcRenderer } from 'electron';

import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { formatTime } from '@doombox-utils';
import { IPC } from '@doombox-utils/types';

// Core
import { Overlay, Typography, LoaderBar } from '../../components';

// Hooks
import { useTranslation } from '../../hooks';

// Styles
import useOverlayScanStyles from './OverlayScan.styles';

const OverlayScan = ({ open }) => {
  const [progress, setProgress] = useState({ file: null, index: 0, total: 0 });
  const [count, setCount] = useState(0);

  const classes = useOverlayScanStyles();
  const { t } = useTranslation();

  useEffect(() => {
    ipcRenderer.on(
      IPC.CHANNEL.SCAN,
      (event, payload) => setProgress(payload.data)
    );

    return () => ipcRenderer.removeAllListeners(IPC.CHANNEL.SCAN);
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
    <Overlay open={open}>
      <div className={classes.root}>
        <div className={classes.title}>
          <Typography align="center" variant="h6">
            {t('title.scanning_files', { transform: 'capitalize' })}
          </Typography>
          <Typography align="center" className={classes.description}>
            {t('description.scanning_files', { transform: 'capitalize' })}
          </Typography>
          <Typography align="center">
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
            className={classes.file}
          >
            {progress.file}
          </Typography>
        )}
      </div>
    </Overlay>
  );
};

OverlayScan.defaultProps = {
  open: false
};

OverlayScan.propTypes = {
  open: PropTypes.bool
};

export default OverlayScan;
