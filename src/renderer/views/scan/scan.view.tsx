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
  const state = {
    process: '',
    size: 32,
    scanned: 0,
    file: '',
    time: { cur: 0, max: 0 }
  };

  const component = new forgo.Component<ScanViewProps>({
    render() {
      return (
        <div class='Scan'>
          {state.process === '' ? [
            <Loader bars={bars} />,
            <h1>Loading</h1>
          ] : [
            <h1 class='title'>{state.process} ({state.scanned} / {state.size})</h1>,
            <p>{formatTimeNumber(state.time.cur, 2)} / {Number.isFinite(state.time.max) ? formatTimeNumber(state.time.max, 2) : '\u221e'}</p>,
            <Progress
              value={state.scanned}
              label='scanning progress'
              max={state.size}
            />,
            <p class='file'>{state.file}</p>
          ]}
        </div>
      );
    }
  });

  useIpc(IpcChannel.Scan, payload => {
    if (payload.process !== state.process) {
      state.time.cur = 0;
      state.time.max = 0;
      state.process = payload.process;
      state.scanned = 0;
    }
    if (payload.size !== state.size) state.size = payload.size;
    if (payload.file !== state.file) {
      state.scanned += 1;
      state.file = payload.file;
    }
  })(component);

  useInterval(() => {
    state.time.cur += 1;
    state.time.max = Math.round(state.time.cur / (state.scanned / state.size));
  }, 1000)(component);

  useMediaQueryList('min-width', ['xs-w', 'sm-w', 'md-w', 'lg-w', 'xl-w'])((_, i) => {
    bars = 12 + (i * 6);
  })(component);

  return component;
};

export default ScanView;