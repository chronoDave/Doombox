import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import sum from '../../../utils/array/sum';
import secToTime from '../../../utils/time/secToTime';
import timeToHhMmSs from '../../../utils/time/timeToHhMmSs';
import { setQueueIndex, shuffleQueue } from '../../actions/queue.actions';
import Icon from '../../components/icon/icon';
import VirtualList from '../../components/virtualList/virtualList';
import cx from '../../utils/cx/cx';
import PlayerCover from '../playerCover/playerCover';

import subscribe from './player.state';

import './player.scss';

export type PlayerProps = {};

const Player: Component<PlayerProps> = () => {
  const component = new forgo.Component<PlayerProps>({
    render() {
      const { queue, current } = subscribe(component);
      const duration = sum(queue, song => song.duration ?? 0);

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
                render: song => (
                  <button
                    id={song._id}
                    type='button'
                    onclick={() => setQueueIndex(song._id)}
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
          </div>
        </div>
      );
    }
  });

  return component;
};

export default Player;
