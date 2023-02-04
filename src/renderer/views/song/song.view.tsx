import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import { formatTimeNumber } from '../../../utils/string/formatTime';
import VirtualList from '../../components/virtualList/virtualList';
import { play } from '../../state/actions/player.actions';
import { getSongs } from '../../state/selectors/library.selectors';

import './song.view.scss';

export type SongViewProps = {};

const SongView: Component<SongViewProps> = () => {
  const component = new forgo.Component<SongViewProps>({
    render() {
      const songs = getSongs();

      return (
        <div class="SongView">
          <h1>All songs</h1>
          <p>{songs.length} songs</p>
          <VirtualList
            size={songs.length}
            overflow={3}
            height={42}
            render={i => {
              const song = songs[i];

              return (
                <button type='button' onclick={() => play(song)}>
                  <img
                    src={song.image ?? 'icons/icon_light.png'}
                    alt=''
                    loading='lazy'
                  />
                  <div class='metadata'>
                    <p>{song.title}</p>
                    <p>{song.artist}</p>
                  </div>
                  <div class='duration'>
                    <p>{formatTimeNumber(song.duration ?? 0, 2)}</p>
                  </div>
                </button>
              );
            }}
          />
        </div>
      );
    }
  });

  return component;
};

export default SongView;
