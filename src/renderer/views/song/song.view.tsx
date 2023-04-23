import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import { toMinSec } from '../../../utils/string/formatTime';
import InputSearch from '../../components/inputSearch/inputSearch';
import VirtualList from '../../components/virtualList/virtualList';
import { play } from '../../state/actions/player.actions';
import { searchSongs } from '../../state/actions/search.actions';
import { getSong, getSongs } from '../../state/selectors/song.selector';
import store from '../../state/store';
import createSubscription from '../../utils/subscribe';

import './song.view.scss';

export type SongViewProps = {};

const SongView: Component<SongViewProps> = () => {
  const subscribe = createSubscription(store);
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
            list={songs}
            overflow={3}
            item={{
              height: 42,
              render: data => {
                const song = getSong(data);

                return (
                  <button id={song._id} type='button' onclick={() => play(song._id)}>
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

  return subscribe((prev, cur) => (
    !prev.search.songs ||
    cur.search.songs?.length !== prev.search.songs.length ||
    cur.search.songs.every((id, i) => prev.search.songs?.[i] === id)
  ))(component);
};

export default SongView;
