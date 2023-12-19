import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import sum from '../../../utils/array/sum';
import secToTime from '../../../utils/time/secToTime';
import { setQueueIndex } from '../../actions/queue.actions';
import VirtualList from '../../components/virtualList/virtualList';
import cx from '../../utils/cx/cx';

import timeToLong from '../../../utils/time/timeToLong';
import subscribe from './queue.state';

import './queue.scss';

export type QueueProps = {};

enum Action {
  SetQueueIndex = 'set-queue-index'
}

const Queue: Component<QueueProps> = () => {
  const actions: Record<Action, (id: string) => void> = {
    [Action.SetQueueIndex]: setQueueIndex
  };

  const isAction = (x?: string): x is Action => {
    if (!x) return false;
    return x in actions;
  };

  const component = new forgo.Component<QueueProps>({
    render() {
      const { queue, current } = subscribe(component);
      const duration = sum(queue, song => song.duration ?? 0);

      return (
        <div class='Queue'>
          <div class='header center'>
            <p>Queue</p>
            <p class='small nowrap'>{queue.length} tracks <span class='dot' aria-hidden='true'>&bull;</span> {timeToLong(secToTime(duration))}</p>
          </div>
          <VirtualList
            data={queue}
            onclick={source => {
              const action = source.closest<HTMLButtonElement>('[data-action]')?.dataset.action;
              const id = source.closest<HTMLElement>('[data-id]')?.dataset.id;

              if (isAction(action) && id) actions[action](id);
            }}
            cell={{
              height: () => 48,
              render: song => (
                <button
                  data-id={song._id}
                  data-action={Action.SetQueueIndex}
                  type='button'
                  class={cx(song._id === current && 'active')}
                >
                  <dl>
                    <dt class='sr-only'>Title</dt>
                    <dd class='nowrap'>{song.title}</dd>
                    <dt class='sr-only'>Artist</dt>
                    <dd class='nowrap small'>{song.artist}</dd>
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
