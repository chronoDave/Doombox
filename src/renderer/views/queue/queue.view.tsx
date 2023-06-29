import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import { Thumb } from '../../../types/library';
import VirtualList from '../../components/virtualList/virtualList';
import { skip } from '../../state/actions/player.actions';
import { thumbSelector } from '../../state/selectors/app.selectors';
import { playerIdSelector } from '../../state/selectors/player.selectors';
import { queueSelector } from '../../state/selectors/queue.selectors';
import { songSelector } from '../../state/selectors/song.selectors';
import cx from '../../utils/cx/cx';

export type QueueViewProps = {};

const QueueView: Component<QueueViewProps> = () => {
  const component = new forgo.Component<QueueViewProps>({
    render() {
      const current = playerIdSelector.get();
      const queue = queueSelector.get();

      return (
        <div class="View QueueView">
          <VirtualList
            list={queue}
            item={{
              height: 48,
              render: (id, i) => {
                const song = songSelector.get(id);

                return (
                  <button
                    type='button'
                    class={cx(id === current && 'active')}
                    aria-label='set queue index'
                    onclick={() => skip(i)}
                  >
                    <img
                      src={thumbSelector.get(Thumb.Song, song.image)}
                      alt=''
                    />
                    <div class='meta'>
                      <span>{song.artist} - {song.title}</span>
                      <span>{song.album}</span>
                    </div>
                  </button>
                );
              }
            }}
          />
        </div>
      );
    }
  });

  playerIdSelector.subscribe(component);
  songSelector.subscribe(component);
  queueSelector.subscribe(component);
  thumbSelector.subscribe(component);

  return component;
};

export default QueueView;
