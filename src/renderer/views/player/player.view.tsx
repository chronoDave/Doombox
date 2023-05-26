import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import secToTime from '../../../utils/time/secToTime';
import timeToHhMmSs from '../../../utils/time/timeToHhMmSs';
import Icon from '../../components/icon/icon';
import VirtualList from '../../components/virtualList/virtualList';
import { AudioStatus } from '../../lib/audio';
import * as player from '../../state/actions/player.actions';
import { next, pause, previous } from '../../state/actions/player.actions';
import { playerStatusSelector } from '../../state/selectors/player.selectors';
import { queueIndexSelector, queueSelector } from '../../state/selectors/queue.selectors';
import { songSelector } from '../../state/selectors/song.selectors';
import { romajiSelector } from '../../state/selectors/user.selectors';
import cx from '../../utils/cx/cx';

import PlayerCover from './playerCover/playerCover';
import PlayerMetadata from './playerMetadata/playerMetadata';
import PlayerSlider from './playerSlider/playerSlider';
import PlayerVolume from './playerVolume/playerVolume';

import './player.view.scss';

export type PlayerViewProps = {};

const PlayerView: Component<PlayerViewProps> = () => {
  const component = new forgo.Component<PlayerViewProps>({
    render() {
      const queue = queueSelector.get();
      const playerStatus = playerStatusSelector.get();

      return (
        <div class='View PlayerView'>
          <div class='panel meta'>
            <PlayerCover />
            <PlayerMetadata />
            <PlayerSlider />
            <div class='PlayerControls'>
              <PlayerVolume />
              <button type='button' onclick={() => previous()}>
                <Icon id='previous' />
              </button>
              <button type='button' onclick={() => pause()}>
                <Icon id={playerStatus === AudioStatus.Playing ? 'pause' : 'play'} />
              </button>
              <button type='button' onclick={() => next()}>
                <Icon id='next' />
              </button>
            </div>
          </div>
          <VirtualList
            list={queue}
            item={{
              height: 38,
              render: (id, i) => {
                const song = songSelector.get(id);

                return (
                  <button
                    id={song._id}
                    type='button'
                    class={cx(queueIndexSelector.get() === i && 'active')}
                    onclick={() => player.skip(i)}
                  >
                    <div class='metadata'>
                      <p>{romajiSelector.get(song.title)}</p>
                      <p>{romajiSelector.get(song.artist)}</p>
                    </div>
                    <div class='duration'>
                      <p>{timeToHhMmSs(secToTime(song.duration ?? 0))}</p>
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

  queueSelector.subscribe(component);
  songSelector.subscribe(component);
  queueIndexSelector.subscribe(component);
  romajiSelector.subscribe(component);
  playerStatusSelector.subscribe(component);

  return component;
};

export default PlayerView;
