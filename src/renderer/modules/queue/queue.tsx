import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import secToTime from '../../../utils/time/secToTime';
import timeToHhMmSs from '../../../utils/time/timeToHhMmSs';
import VirtualList from '../../components/virtualList/virtualList';
import { setQueueIndex } from '../../state/actions/queue.actions';
import { queueSelector, queueIdSelector, queueDurationSelector } from '../../state/selectors/queue.selectors';
import { songSelector } from '../../state/selectors/song.selectors';
import cx from '../../utils/cx/cx';

import './queue.scss';

export type QueueProps = {
  classes?: string
};

const Queue: Component<QueueProps> = () => {
  const component = new forgo.Component<QueueProps>({
    render(props) {
      const queue = queueSelector.get();
      const queueDuration = queueDurationSelector.get();

      return (
        <div class={cx('Queue', props.classes)}>
          <div class='metadata'>
            <h2>Next up</h2>
            <p>{queue.length} tracks - {timeToHhMmSs(secToTime(queueDuration))}</p>
          </div>
          <VirtualList
            list={queue}
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
                        <dd class='title nowrap'>{song.title}</dd>
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
        </div>
      );
    }
  });

  songSelector.subscribe(component);
  queueSelector.subscribe(component);
  queueIdSelector.subscribe(component);
  queueDurationSelector.subscribe(component);

  return component;
};

export default Queue;
