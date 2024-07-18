import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import VirtualList from '@doombox/components/virtual-list/virtual-list';
import Time from '@doombox/lib/time/time';
import cx from '@doombox/renderer/css/cx';

import { setQueueIndex } from '../../state/actions/queue.actions';

import subscribe from './queue.state';

import './queue.scss';

export type QueueProps = {};

const Queue: Component<QueueProps> = () => {
  const component = new forgo.Component<QueueProps>({
    render() {
      const state = subscribe('Queue', component);

      return (
        <div class='Queue panel column'>
          <div class='header'>
            <p class='nowrap'>{state.title}</p>
            <dl class='horizontal reverse'>
              <div>
                <dt>Track(s)</dt>
                <dd>{state.queue.length}</dd>
              </div>
              <div>
                <dt class='sr-only'>Duration</dt>
                <dd>{new Time(state.duration).toLong()}</dd>
              </div>
            </dl>
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
                      <dd class='nowrap'>{song.artist}</dd>
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
