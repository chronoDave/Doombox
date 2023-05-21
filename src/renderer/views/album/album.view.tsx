import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import { Thumb } from '../../../types/library';
import secToTime from '../../../utils/time/secToTime';
import timeToHhMmSs from '../../../utils/time/timeToHhMmSs';
import Icon from '../../components/icon/icon';
import InputSearch from '../../components/inputSearch/inputSearch';
import VirtualGrid from '../../components/virtualGrid/virtualGrid';
import useMediaQuery from '../../hooks/useMediaQuery';
import { addToPlaylist, setPlaylist } from '../../state/actions/playlist.actions';
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
      const duration = albums
        .reduce((acc, cur) => acc + (albumSelector.get(cur).duration ?? 0), 0);

      const getSongs = (ids: string[]) => ids
        .map(id => albumSelector.get(id).songs)
        .flat();

      return (
        <div class="View AlbumView">
          <h1 class='sr-only'>Album view</h1>
          <InputSearch
            placeholder='search for album'
            onsubmit={query => searchAlbums(query)}
          />
          <div class='toolbar'>
            <p class='status'>
              <span><Icon id='musicBox' />{albums.length}</span>
              <span><Icon id='stopwatch' />{timeToHhMmSs(secToTime(duration))}</span>
            </p>
            <div class='actions'>
              <button type='button' onclick={() => setPlaylist(getSongs(albums))}>
                <Icon id='playlistPlay' />
              </button>
              <button type='button' onclick={() => addToPlaylist(getSongs(albums))}>
                <Icon id='playlistAdd' />
              </button>
            </div>
          </div>
          <VirtualGrid
            list={albums}
            item={{
              width,
              height: width + 42,
              render: id => {
                const album = albumSelector.get(id);
                const thumbs = thumbSelector.get(album.image, Thumb.Album);

                return (
                  <button
                    id={album._id}
                    type='button'
                    onclick={() => setPlaylist(album.songs)}
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
                      <p>{album.album}</p>
                      <p>{album.albumartist}</p>
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
    width = 96 + i * 24;
  })(component);

  albumSearchSelector.subscribe(component);
  albumsSelector.subscribe(component);
  albumSelector.subscribe(component);
  thumbSelector.subscribe(component);
  playerSongSelector.subscribe(component);

  return component;
};

export default AlbumView;
