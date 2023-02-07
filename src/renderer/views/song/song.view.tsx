import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import { formatTimeNumber } from '../../../utils/string/formatTime';
import InputSearch from '../../components/inputSearch/inputSearch';
import VirtualList from '../../components/virtualList/virtualList';
import { play } from '../../state/actions/player.actions';
// import { search } from '../../state/actions/song.actions';
import { getSong } from '../../state/selectors/library.selectors';
import store from '../../state/store';

import './song.view.scss';

export type SongViewProps = {};

const SongView: Component<SongViewProps> = () => {
  const component = new forgo.Component<SongViewProps>({
    render() {
      const { entities } = store.get();

      return (
        <div class="SongView">
          <h1>All songs</h1>
          <InputSearch onsubmit={x => search(x)} />
          <p>{entities.song.size} songs</p>
          {/* <VirtualList
            size={library.search.songs.length}
            overflow={3}
            height={42}
            render={i => {
              const song = getSong(library.search.songs[i]);

              return (
                <button id={song._id} type='button' onclick={() => play(song)}>
                  <img
                    width={34}
                    height={34}
                    src={song.image ?? 'icons/icon_light.png'}
                    alt=''
                    loading='lazy'
                  />
                  <div class='metadata'>
                    <p>{song.romaji.title ?? song.title}</p>
                    <p>{song.romaji.artist ?? song.artist}</p>
                  </div>
                  <div class='duration'>
                    <p>{formatTimeNumber(song.duration ?? 0, 2)}</p>
                  </div>
                </button>
              );
            }}
          /> */}
        </div>
      );
    }
  });

  return store.subscribe(component, (cur, prev) => (
    prev.library.search.songs.length !== cur.library.search.songs.length ||
    prev.library.search.songs.every((id, i) => cur.library.search.songs[i] === id)
  ));
};

export default SongView;
