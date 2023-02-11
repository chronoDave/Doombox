import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import { toMinSec } from '../../../utils/string/formatTime';
import InputSearch from '../../components/inputSearch/inputSearch';
import VirtualList from '../../components/virtualList/virtualList';
import { searchSongs } from '../../state/actions/library.actions';
import { play } from '../../state/actions/player.actions';
import { getSong } from '../../state/selectors/library.selectors';
import { getSongs } from '../../state/selectors/song.selector';
import store from '../../state/store';

import './song.view.scss';

export type SongViewProps = {};

const SongView: Component<SongViewProps> = () => {
  const component = new forgo.Component<SongViewProps>({
    render() {
      const { search } = store.get();
      const songs = (search.songs ?? getSongs()) as string[];

      return (
        <div class="SongView">
          <h1>All songs</h1>
          <InputSearch
            placeholder='search for song title'
            onsubmit={x => searchSongs(x)}
          />
          <p>{songs.length} songs</p>
          <VirtualList
            data={songs}
            overflow={3}
            item={{
              height: 42,
              render: data => {
                const song = getSong(data);

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

  return store.subscribe(component, (cur, prev) => (
    !cur.search.songs ||
    prev.search.songs?.length !== cur.search.songs.length ||
    prev.search.songs.every((id, i) => cur.search.songs?.[i] === id)
  ));
};

export default SongView;
