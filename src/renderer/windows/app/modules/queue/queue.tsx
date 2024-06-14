import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import VirtualList from '@doombox/components/virtualList/virtualList';
import { sumSelect } from '@doombox/lib/math/sum';
import Time from '@doombox/lib/time/time';
import cx from '@doombox/renderer/css/cx';

import { setQueueIndex } from '../../actions/queue.actions';

import subscribe from './queue.state';

import './queue.scss';

export type QueueProps = {};

const Queue: Component<QueueProps> = () => {
  const component = new forgo.Component<QueueProps>({
    render() {
      const state = subscribe('Queue', component);
      const duration = sumSelect(state.queue, song => song.duration ?? 0);

      return (
        <div class='Queue panel column'>
          <div class='header'>
            <p class='nowrap'>{state.title}</p>
            <p class='small nowrap'>{state.queue.length} tracks<span class='glyph dot' />{new Time(duration).toLong()}</p>
          </div>
          <VirtualList
            data={state.queue}
            onclick={setQueueIndex}
            cell={{
              id: song => song._id,
              height: () => 44,
              render: ({ data: song, scrollTo }) => {
                const active = song._id === state.current;
                scrollTo(state.queue.findIndex(x => x._id === state.current));

                return (
                  <button
                    type='button'
                    class={cx('button', active && 'active')}
                    aria-label='Set queue index'
                  >
                    <dl>
                      <dt class='sr-only'>Title</dt>
                      <dd class='nowrap'>{song.title}</dd>
                      <dt class='sr-only'>Artist</dt>
                      <dd class='small nowrap'>{song.artist}</dd>
                    </dl>
                  </button>
                );
              }
            }}
          />
        </div >
      );
    }
  });

  return component;
};

export default Queue;
