import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import secToTime from '../../../utils/time/secToTime';
import timeToHhMmSs from '../../../utils/time/timeToHhMmSs';
import VirtualList from '../../components/virtualList/virtualList';
import PlayerControls from '../../modules/playerControls/playerControls';
import PlayerCover from '../../modules/playerCover/playerCover';
import PlayerMeta from '../../modules/playerMeta/playerMeta';
import PlayerSlider from '../../modules/playerSlider/playerSlider';
import * as player from '../../state/actions/player.actions';
import { queueIndexSelector, queueSelector } from '../../state/selectors/queue.selectors';
import { songSelector } from '../../state/selectors/song.selectors';
import { romajiSelector } from '../../state/selectors/user.selectors';
import cx from '../../utils/cx/cx';

import './player.view.scss';

export type PlayerViewProps = {};

const PlayerView: Component<PlayerViewProps> = () => {
  const component = new forgo.Component<PlayerViewProps>({
    render() {
      const queue = queueSelector.get();

      return (
        <div class='View PlayerView'>
          <div class='panel meta'>
            <PlayerCover />
            <PlayerMeta />
            <PlayerSlider />
            <PlayerControls />
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

  return component;
};

export default PlayerView;
