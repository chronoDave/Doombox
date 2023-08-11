import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import VirtualList from '../../components/virtualList/virtualList';
import { setQueueIndex } from '../../state/actions/queue.actions';
import { queueSelector, queueIdSelector } from '../../state/selectors/queue.selectors';
import { songSelector } from '../../state/selectors/song.selectors';
import cx from '../../utils/cx/cx';

import './queue.scss';

export type QueueProps = {};

const Queue: Component<QueueProps> = () => {
  const component = new forgo.Component<QueueProps>({
    render() {
      const queue = queueSelector.get();

      return (
        <VirtualList
          list={queue}
          classes='Queue'
          item={{
            height: 24,
            render: (id, i) => {
              const song = songSelector.get(id);

              return (
                <button
                  id={song._id}
                  type='button'
                  onclick={() => setQueueIndex(song._id)}
                  class={cx(id === queueIdSelector.get() && 'active')}
                >
                  <span aria-hidden='true' class='index'>{i + 1}.</span>
                  <dl>
                    <div class='metadata'>
                      <dt class='sr-only'>Title</dt>
                      <dd class='title'>{song.title}</dd>
                      {/* <dt class='sr-only'>Artist</dt>
                      <dd class='artist'>{song.artist}</dd> */}
                      {/* <dt class='sr-only'>Album</dt>
                      <dd class='album'>{song.album}</dd> */}
                    </div>
                    {/* <div class='duration'>
                      <dt class='sr-only'>Duration</dt>
                      <dd>{timeToHhMmSs(secToTime(song.duration ?? 0))}</dd>
                    </div> */}
                  </dl>
                </button>
              );
            }
          }}
        />
      );
    }
  });

  songSelector.subscribe(component);
  queueSelector.subscribe(component);
  queueIdSelector.subscribe(component);

  return component;
};

export default Queue;
