import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import { toMinSec } from '../../../utils/string/formatTime';
import VirtualList from '../../components/virtualList/virtualList';
import PlayerControls from '../../modules/playerControls/playerControls';
import PlayerCover from '../../modules/playerCover/playerCover';
import PlayerMeta from '../../modules/playerMeta/playerMeta';
import PlayerSlider from '../../modules/playerSlider/playerSlider';
import { getCurrent } from '../../selectors/player.selectors';
import { getPlaylist } from '../../selectors/playlist.selector';
import { getSong } from '../../selectors/song.selector';
import player from '../../state/player';
import store from '../../state/store';
import cx from '../../utils/cx';
import createSubscription from '../../utils/subscribe';

import './player.view.scss';

export type PlayerViewProps = {};

const PlayerView: Component<PlayerViewProps> = () => {
  const subscribe = createSubscription(store);
  const component = new forgo.Component<PlayerViewProps>({
    render() {
      const labels = getPlaylist(store)();
      const current = getCurrent(store)();

      return (
        <div class='PlayerView'>
          <div class='panel meta'>
            <PlayerCover />
            <PlayerMeta />
            <PlayerSlider />
            <PlayerControls />
          </div>
          <VirtualList
            list={labels}
            overflow={3}
            item={{
              height: 38,
              render: id => {
                const song = getSong(store)(id);

                return (
                  <button
                    id={song._id}
                    type='button'
                    class={cx(current?._id === song._id && 'active')}
                    onclick={() => player.play(song._id)}
                  >
                    <div class='metadata'>
                      <p>{song.romaji.title ?? song.title}</p>
                      <p>{song.romaji.artist ?? song.artist}</p>
                    </div>
                    <div class='duration'>
                      <p>{toMinSec(song.duration ?? 0)}</p>
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

  return subscribe((prev, cur) => (
    prev.player.current.id !== cur.player.current.id ||
    !prev.playlist.songs ||
    cur.playlist.songs?.length !== prev.playlist.songs.length ||
    cur.playlist.songs.every((id, i) => prev.playlist.songs?.[i] === id)
  ))(component);
};

export default PlayerView;
