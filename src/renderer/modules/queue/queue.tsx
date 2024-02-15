import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import sum from '../../../utils/array/sum';
import secToTime from '../../../utils/time/secToTime';
import timeToLong from '../../../utils/time/timeToLong';
import { setQueueIndex } from '../../actions/queue.actions';
import VirtualList from '../../components/virtualList/virtualList';
import cx from '../../utils/cx/cx';

import subscribe from './queue.state';

import './queue.scss';

export type QueueProps = {};

const Queue: Component<QueueProps> = () => {
  const component = new forgo.Component<QueueProps>({
    render() {
      const state = subscribe(component);
      const duration = sum(state.queue, song => song.duration ?? 0);

      return (
        <div class='Queue panel column'>
          <div class='header'>
            <p class='nowrap'>{state.title}</p>
            <p class='small nowrap'>{state.queue.length} tracks<span class='glyph dot' />{timeToLong(secToTime(duration))}</p>
          </div>
          <VirtualList
            data={state.queue}
            onclick={setQueueIndex}
            cell={{
              id: song => song._id,
              height: () => 44,
              render: song => (
                <button
                  type='button'
                  class={cx('button', song._id === state.current && 'active')}
                  aria-label='Set queue index'
                >
                  <dl>
                    <dt class='sr-only'>Title</dt>
                    <dd class='nowrap'>{song.title}</dd>
                    <dt class='sr-only'>Artist</dt>
                    <dd class='small nowrap'>{song.artist}</dd>
                  </dl>
                </button>
              )
            }}
          />
        </div >
      );
    }
  });

  return component;
};

export default Queue;
