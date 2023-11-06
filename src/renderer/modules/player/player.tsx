import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';
import secToTime from '../../../utils/time/secToTime';
import timeToHhMmSs from '../../../utils/time/timeToHhMmSs';
import Icon from '../../components/icon/icon';
import VirtualList from '../../components/virtualList/virtualList';
import { setQueueIndex, shuffleQueue } from '../../state/actions/queue.actions';
import { queueDurationSelector, queueIdSelector, queueSelector } from '../../state/selectors/queue.selectors';
import { songSelector } from '../../state/selectors/song.selectors';
import cx from '../../utils/cx/cx';

import PlayerControls from '../playerControls/playerControls';
import PlayerCover from '../playerCover/playerCover';
import PlayerMetadata from '../playerMetadata/playerMetadata';
import PlayerQueue from '../playerQueue/playerQueue';
import PlayerSlider from '../playerSlider/playerSlider';

import './player.scss';

export type PlayerProps = {};

const Player: Component<PlayerProps> = () => {
  const component = new forgo.Component<PlayerProps>({
    render() {
      const queue = queueSelector.get();
      const duration = queueDurationSelector.get();

      return (
        <div class='Player'>
          <PlayerCover />
          <div class='queue'>
            <div class='header'>
              <div class='meta'>
                <p>Queue</p>
                <p class='small'>{queue.length} songs - {timeToHhMmSs(secToTime(duration))}</p>
              </div>
              <div class='actions'>
                <button type='button' onclick={shuffleQueue}>
                  <Icon id='shuffle' />
                </button>
              </div>
            </div>
            <VirtualList
              list={queue}
              item={{
                height: 48,
                render: id => {
                  const song = songSelector.get(id);

                  return (
                    <button
                      id={id}
                      type='button'
                      onclick={() => setQueueIndex(id)}
                      class={cx(id === queueIdSelector.get() && 'active')}
                    >
                      <dl>
                        <dt class='sr-only'>Title</dt>
                        <dd class='nowrap'>{song.title}</dd>
                        <dt class='sr-only'>Artist</dt>
                        <dd class='nowrap small'>{song.artist}</dd>
                      </dl>
                    </button>
                  );
                }
              }}
            />
          </div>
        </div>
      );
    }
  });

  queueSelector.subscribe(component);
  queueIdSelector.subscribe(component);
  queueDurationSelector.subscribe(component);

  return component;
};

export default Player;
