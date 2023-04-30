import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import InputSearch from '../../components/inputSearch/inputSearch';
import VirtualGrid from '../../components/virtualGrid/virtualGrid';
import { addToPlaylist } from '../../state/actions/playlist.actions';
import { searchAlbums } from '../../state/actions/search.actions';
import { albumSelector, albumsSelector } from '../../state/selectors/album.selectors';
import { thumbSelector } from '../../state/selectors/app.selectors';
import { albumSearchSelector } from '../../state/selectors/search.selectors';

import './album.view.scss';

export type AlbumViewProps = {};

const AlbumView: Component<AlbumViewProps> = () => {
  const component = new forgo.Component<AlbumViewProps>({
    render() {
      const search = albumSearchSelector.get();
      const albums = (search ?? albumsSelector.get());

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
                const album = albumSelector.get(id);

                return (
                  <button
                    id={album._id}
                    type='button'
                    onclick={() => addToPlaylist(album.songs)}
                  >
                    <img
                      loading="lazy"
                      src={thumbSelector.get(album.image)}
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

  albumSearchSelector.subscribe(component);
  albumsSelector.subscribe(component);
  albumSelector.subscribe(component);
  thumbSelector.subscribe(component);

  return component;
};

export default AlbumView;
