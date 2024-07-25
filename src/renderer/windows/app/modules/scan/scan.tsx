import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import Progress from '@doombox/components/progress/progress';
import Time from '@doombox/lib/time/time';

import { useInterval } from '../../hooks/useInterval';
import useIpc from '../../hooks/useIpc';

import './scan.scss';

export type ScanViewProps = {};

const ScanView: Component<ScanViewProps> = () => {
  const state = {
    process: '',
    size: 32,
    scanned: 0,
    file: '',
    time: { cur: 0, max: 0 }
  };

  const cur = new Time(state.time.cur).toShort();
  const max = Number.isFinite(state.time.max) ?
    new Time(state.time.max).toShort() :
    '\u221e';

  const component = new forgo.Component<ScanViewProps>({
    render() {
      return (
        <main class='scan'>
          <h1>{state.process} ({state.scanned} / {state.size})</h1>
          <p>{cur} / {max}</p>
          <Progress
            value={state.scanned}
            label='scanning progress'
            max={state.size}
          />
          <p class='file'>{state.file}</p>
        </main>
      );
    }
  });

  useIpc('parser', 'size', payload => {
    state.size = payload;
  })(component);

  useIpc('parser', 'file', payload => {
    if (state.process !== 'Scanning') {
      state.time.cur = 0;
      state.time.max = 0;
      state.scanned = 0;
      state.process = 'Scanning';
    }

    state.scanned += 1;
    state.file = payload;
  })(component);

  useInterval(() => {
    state.time.cur += 1;
    state.time.max = Math.round(state.time.cur / (state.scanned / state.size));
  }, 1000)(component);

  return component;
};

export default ScanView;
