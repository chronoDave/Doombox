import { ipcRenderer } from 'electron';
import React, {
  useState,
  useEffect,
  useMemo,
  useRef
} from 'react';
import PropTypes from 'prop-types';
import { IPC } from '@doombox-utils/types';

import { Overlay, LoaderBar } from '../../components';
import { useTranslation } from '../../hooks';

import './OverlayScan.scss';

const OverlayScan = ({ open }) => {
  const [progress, setProgress] = useState({ file: null, index: 0, total: 0 });
  const [count, setCount] = useState(0);

  const { t, formatTime } = useTranslation();

  const counter = useRef();

  useEffect(() => {
    ipcRenderer.on(
      IPC.CHANNEL.SCAN,
      (event, payload) => setProgress(payload.data)
    );

    return () => ipcRenderer.removeAllListeners(IPC.CHANNEL.SCAN);
  }, []);

  useEffect(() => {
    if (open) {
      counter.current = setInterval(() => setCount(newCount => newCount + 1), 1000);
      setProgress({ file: null, index: 0, total: 0 });
    } else if (counter.current) {
      clearInterval(counter.current);
    }

    return () => counter.current && clearInterval(counter.current);
  }, [open]);

  const value = progress.total > 0 ?
    Math.round((progress.index / progress.total) * 100) :
    0;

  // Should only update on counter update
  const estimate = useMemo(() => {
    if (value === 0) return '\u221e';
    return formatTime(count / (value / 100));
  }, [count]);

  return (
    <Overlay open={open}>
      <div className="OverlayScan">
        <div className="title">
          <h6>{t('title.scanning_files', { transform: 'capitalize' })}</h6>
          <p className="description">{t('description.scanning_files', { transform: 'capitalize' })}</p>
          <p>{`${formatTime(count)} / ${estimate}`}</p>
        </div>
        <div className="progress">
          <LoaderBar value={value} />
          <p className="label">{`${value}%`}</p>
        </div>
        {progress.file && <caption>{progress.file}</caption>}
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
