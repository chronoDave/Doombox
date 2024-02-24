import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import secToTime from '../../../lib/time/secToTime';
import timeToShort from '../../../lib/time/timeToShort';
import { IpcRoute } from '../../../types/ipc';
import Loader from '../../components/loader/loader';
import Progress from '../../components/progress/progress';
import { useInterval } from '../../hooks/useInterval';
import useIpc from '../../hooks/useIpc';
import useMediaQuery from '../../hooks/useMediaQuery';
import createMediaQuery from '../../utils/mediaQuery';

import './scan.scss';

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

  const cur = timeToShort(secToTime(state.time.cur));
  const max = Number.isFinite(state.time.max) ?
    timeToShort(secToTime(state.time.max)) :
    '\u221e';

  const component = new forgo.Component<ScanViewProps>({
    render() {
      return (
        <section class='Scan'>
          {state.process === '' ? [
            <Loader bars={bars} />,
            <h1 class='h4'>Loading...</h1>
          ] : [
            <h1 class='h4 title'>{state.process} ({state.scanned} / {state.size})</h1>,
            <p>{cur} / {max}</p>,
            <Progress
              value={state.scanned}
              label='scanning progress'
              max={state.size}
            />,
            <p class='file'>{state.file}</p>
          ]}
        </section>
      );
    }
  });

  useIpc(IpcRoute.Image, payload => {
    if (state.process !== 'Scanning images...') {
      state.time.cur = 0;
      state.time.max = 0;
      state.scanned = 0;
      state.process = 'Scanning images...';
    }

    if (payload.size !== state.size) state.size = payload.size;
    if (payload.file !== state.file) {
      state.scanned += 1;
      state.file = payload.file;
    }
  })(component);

  useIpc(IpcRoute.Song, payload => {
    if (state.process !== 'Scanning songs...') {
      state.time.cur = 0;
      state.time.max = 0;
      state.scanned = 0;
      state.process = 'Scanning songs...';
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

  useMediaQuery([
    createMediaQuery({ axis: 'min-width', breakpoint: 'xs-w' }),
    createMediaQuery({ axis: 'min-width', breakpoint: 'sm-w' }),
    createMediaQuery({ axis: 'min-width', breakpoint: 'md-w' }),
    createMediaQuery({ axis: 'min-width', breakpoint: 'lg-w' }),
    createMediaQuery({ axis: 'min-width', breakpoint: 'xl-w' })
  ])(i => {
    bars = 12 + (i * 6);
  })(component);

  return component;
};

export default ScanView;
