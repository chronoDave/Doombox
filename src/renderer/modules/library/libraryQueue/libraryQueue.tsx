import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import sum from '../../../../utils/array/sum';
import secToTime from '../../../../utils/time/secToTime';
import timeToHhMmSs from '../../../../utils/time/timeToHhMmSs';
import { createPlaylist } from '../../../actions/playlist.actions';
import { setQueueIndex, shuffleQueue } from '../../../actions/queue.actions';
import Icon from '../../../components/icon/icon';
import VirtualList from '../../../components/virtualList/virtualList';
import cx from '../../../utils/cx/cx';

import subscribe from './libraryQueue.state';

import './libraryQueue.scss';

export type LibraryQueueProps = {};

enum Action {
  SetQueueIndex = 'set-queue-index'
}

const LibraryQueue: Component<LibraryQueueProps> = () => {
  const actions: Record<Action, (id: string) => void> = {
    [Action.SetQueueIndex]: setQueueIndex
  };

  const isAction = (x?: string): x is Action => {
    if (!x) return false;
    return x in actions;
  };

  const component = new forgo.Component<LibraryQueueProps>({
    render() {
      const { queue, current } = subscribe(component);
      const duration = sum(queue, song => song.duration ?? 0);

      return (
        <div class='LibraryQueue'>
          <div class='header'>
            <div class='meta'>
              <p>Queue</p>
              <p class='small nowrap'>{queue.length} songs <span class='dot' aria-hidden='true'>&bull;</span> {timeToHhMmSs(secToTime(duration))}</p>
            </div>
            <div class='actions'>
              <button type='button' onclick={shuffleQueue} aria-label='Shuffle queue'>
                <Icon id='shuffle' />
              </button>
              <button
                type='button'
                onclick={() => createPlaylist(queue.map(song => song._id))}
                aria-label='Create playlist from queue'
              >
                <Icon id='listAdd' />
              </button>
            </div>
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

export default LibraryQueue;
