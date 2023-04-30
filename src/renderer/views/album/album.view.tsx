import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import InputSearch from '../../components/inputSearch/inputSearch';
import VirtualGrid from '../../components/virtualGrid/virtualGrid';
import { getAlbum, getAlbums } from '../../selectors/album.selector';
import { getThumb } from '../../selectors/song.selector';
import { addToPlaylist } from '../../state/actions/playlist.actions';
import { searchAlbums } from '../../state/actions/search.actions';
import store from '../../state/store';
import createSubscription from '../../utils/subscribe';

import './album.view.scss';

export type AlbumViewProps = {};

const AlbumView: Component<AlbumViewProps> = () => {
  const subscribe = createSubscription(store);
  const component = new forgo.Component<AlbumViewProps>({
    render() {
      const { search } = store.get();
      const albums = (search.albums ?? getAlbums(store)()) as string[];

      return (
        <div class="AlbumView">
          <h1>All albums</h1>
          <InputSearch
            placeholder='search for label'
            onsubmit={query => searchAlbums(query)}
          />
          <p>{albums.length} albums</p>
          <VirtualGrid
            list={albums}
            item={{
              width: 64,
              render: id => {
                const album = getAlbum(store)(id);

                return (
                  <button
                    id={album._id}
                    type='button'
                    onclick={() => addToPlaylist(album.songs)}
                  >
                    <img
                      loading="lazy"
                      src={getThumb(store)(album.image)}
                      alt=''
                      width={64}
                      height={64}
                    />
                    {/* <div class='metadata'>
                      <p>{album.romaji.album ?? album.album}</p>
                      <p>{album.romaji.albumartist ?? album.albumartist}</p>
                    </div>
                    <div class='duration'>
                      <p>{toMinSec(album.duration ?? 0)}</p>
                    </div> */}
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
    !prev.search.albums ||
    cur.search.albums?.length !== prev.search.albums.length ||
    cur.search.albums.every((id, i) => prev.search.albums?.[i] === id)
  ))(component);
};

export default AlbumView;
