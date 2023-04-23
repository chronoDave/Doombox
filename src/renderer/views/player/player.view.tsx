import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import { toMinSec } from '../../../utils/string/formatTime';
import VirtualList from '../../components/virtualList/virtualList';
import PlayerControls from '../../modules/playerControls/playerControls';
import PlayerCover from '../../modules/playerCover/playerCover';
import PlayerMeta from '../../modules/playerMeta/playerMeta';
import PlayerSlider from '../../modules/playerSlider/playerSlider';
import { getPlaylist } from '../../state/selectors/playlist.selector';
import { getSong } from '../../state/selectors/song.selector';
import store from '../../state/store';

import './player.view.scss';

export type PlayerViewProps = {};

const PlayerView: Component<PlayerViewProps> = () => {
  const component = new forgo.Component<PlayerViewProps>({
    render() {
      const labels = getPlaylist();

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
                const song = getSong(id);

                return (
                  <div id={song._id}>
                    <div class='metadata'>
                      <p>{song.romaji.title ?? song.title}</p>
                      <p>{song.romaji.artist ?? song.artist}</p>
                    </div>
                    <div class='duration'>
                      <p>{toMinSec(song.duration ?? 0)}</p>
                    </div>
                  </div>
                );
              }
            }}
          />
        </div>
      );
    }
  });

  return store.subscribe(component, (prev, cur) => (
    !prev.playlist.songs ||
    cur.playlist.songs?.length !== prev.playlist.songs.length ||
    cur.playlist.songs.every((id, i) => prev.playlist.songs?.[i] === id)
  ));
};

export default PlayerView;
