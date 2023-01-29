import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import { IpcChannel } from '../../../types/ipc';
import { formatTimeNumber } from '../../../utils/string/formatTime';
import Loader from '../../components/loader/loader';
import Progress from '../../components/progress/progress';
import { useInterval } from '../../hooks/useInterval';
import useIpc from '../../hooks/useIpc';
import { useMediaQueryList } from '../../hooks/useMediaQuery';

import './scan.view.scss';

export type ScanViewProps = {};

const ScanView: Component<ScanViewProps> = () => {
  let bars = 12;
  const time = { cur: 0, max: 0 };
  const scan = {
    size: 0,
    scanned: 0,
    file: ''
  };

  const component = new forgo.Component<ScanViewProps>({
    render() {
      return (
        <div class='Scan'>
          {(scan.size === 0 || scan.scanned === scan.size) ? [
            <Loader bars={bars} />,
            <h1>Loading</h1>
          ] : [
            <h1 class='title'>Scanning ({scan.scanned} / {scan.size})</h1>,
            <p>{formatTimeNumber(time.cur, 2)} / {Number.isFinite(time.max) ? formatTimeNumber(time.max, 2) : '\u221e'}</p>,
            <Progress
              value={scan.scanned}
              label='scanning progress'
              max={scan.size}
            />,
            <p class='file'>{scan.file}</p>
          ]}
        </div>
      );
    }
  });

  useIpc(IpcChannel.Scan, payload => {
    if (typeof payload.size === 'number') scan.size = payload.size;
    if (typeof payload.file === 'string') {
      scan.file = payload.file;
      scan.scanned += 1;
    }
  })(component);

  useInterval(() => {
    time.cur += 1;
    time.max = Math.round(time.cur / (scan.scanned / scan.size));
  }, 1000)(component);

  useMediaQueryList('min-width', ['xs-w', 'sm-w', 'md-w', 'lg-w', 'xl-w'])((_, i) => {
    bars = 12 + (i * 6);
  })(component);

  return component;
};

export default ScanView;
