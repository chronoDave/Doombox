import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import { Thumb } from '../../../types/library';
import InputSearch from '../../components/inputSearch/inputSearch';
import VirtualGrid from '../../components/virtualGrid/virtualGrid';
import useMediaQuery from '../../hooks/useMediaQuery';
import { setQueue } from '../../state/actions/queue.actions';
import { searchAlbums } from '../../state/actions/search.actions';
import { albumSelector, albumsSelector } from '../../state/selectors/album.selectors';
import { thumbSelector } from '../../state/selectors/app.selectors';
import { playerSongSelector } from '../../state/selectors/player.selectors';
import { albumSearchSelector } from '../../state/selectors/search.selectors';
import cx from '../../utils/cx/cx';
import createMediaQuery from '../../utils/mediaQuery';

import './album.view.scss';

export type AlbumViewProps = {};

const AlbumView: Component<AlbumViewProps> = () => {
  let width = 0;

  const component = new forgo.Component<AlbumViewProps>({
    render() {
      const search = albumSearchSelector.get();
      const albums = (search ?? albumsSelector.get());

      return (
        <div class="View AlbumView">
          <InputSearch
            placeholder='search for album'
            onsubmit={query => searchAlbums(query)}
          />
          <VirtualGrid
            list={albums}
            item={{
              width,
              height: width * 0.25,
              render: id => {
                const album = albumSelector.get(id);
                const thumbs = thumbSelector.get(Thumb.Album, album.image);

                return (
                  <button
                    id={album._id}
                    type='button'
                    onclick={() => setQueue(album.songs)}
                    class={cx(playerSongSelector.get()?.album === album.album && 'active')}
                  >
                    <img
                      loading='lazy'
                      src={thumbs}
                      alt=''
                      width={Thumb.Album}
                      height={Thumb.Album}
                    />
                    <div class='metadata'>
                      <p class='album nowrap'>{album.album}</p>
                      <p class='albumartist'>{album.albumartist}</p>
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

  component.unmount(() => {
    searchAlbums('');
  });

  useMediaQuery([
    createMediaQuery({ axis: 'min-width', breakpoint: 'xs-w' }, { axis: 'min-height', breakpoint: 'xs-h' }),
    createMediaQuery({ axis: 'min-width', breakpoint: 'sm-w' }, { axis: 'min-height', breakpoint: 'sm-h' }),
    createMediaQuery({ axis: 'min-width', breakpoint: 'md-w' }, { axis: 'min-height', breakpoint: 'md-h' }),
    createMediaQuery({ axis: 'min-width', breakpoint: 'lg-w' }, { axis: 'min-height', breakpoint: 'lg-h' }),
    createMediaQuery({ axis: 'min-width', breakpoint: 'xl-w' }, { axis: 'min-height', breakpoint: 'xl-h' })
  ])(i => {
    width = 192 + 64 * i;
  })(component);

  albumSearchSelector.subscribe(component);
  albumsSelector.subscribe(component);
  albumSelector.subscribe(component);
  thumbSelector.subscribe(component);
  playerSongSelector.subscribe(component);

  return component;
};

export default AlbumView;
