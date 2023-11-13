import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import { Thumb } from '../../../../types/library';
import sum from '../../../../utils/array/sum';
import secToTime from '../../../../utils/time/secToTime';
import timeToHhMmSs from '../../../../utils/time/timeToHhMmSs';
import { setQueue } from '../../../actions/queue.actions';
import { searchAlbums } from '../../../actions/search.actions';
import Icon from '../../../components/icon/icon';
import InputSearch from '../../../components/inputSearch/inputSearch';
import VirtualGrid from '../../../components/virtualGrid/virtualGrid';
import cx from '../../../utils/cx/cx';

import subscribe from './libraryAlbums.state';

import './libraryAlbums.scss';

export type LibraryAlbumsProps = {};

const LibraryAlbums: Component<LibraryAlbumsProps> = () => {
  const component = new forgo.Component<LibraryAlbumsProps>({
    render() {
      const { albums, current } = subscribe(component);
      const duration = sum(albums, album => album.duration ?? 0);

      return (
        <div class="LibraryAlbums">
          <InputSearch
            placeholder='search for album'
            onsubmit={query => searchAlbums(query)}
            oninput={query => searchAlbums(query)}
          />
          <div class="toolbar">
            <p class='meta'>
              <span><Icon id='boxesMusic' />{albums.length}</span>
              <span><Icon id='stopwatch' />{timeToHhMmSs(secToTime(duration))}</span>
            </p>
            <div class='actions'>
              <button
                type='button'
                onclick={() => setQueue(albums.map(album => album.songs).flat())}
              >
                <Icon id='listPlay' />
              </button>
            </div>
          </div>
          <VirtualGrid
            list={albums}
            item={{
              id: album => album._id,
              width: 96,
              height: 96,
              render: album => (
                <button
                  id={album._id}
                  type='button'
                  onclick={() => setQueue(album.songs)}
                  class={cx(current === album.album && 'active')}
                >
                  <img
                    loading='lazy'
                    src={album.image!}
                    alt=''
                    width={Thumb.Album}
                    height={Thumb.Album}
                  />
                  <div class='metadata'>
                    <p class='album nowrap'>{album.album}</p>
                    <p class='small albumartist nowrap'>{album.albumartist ?? '-'}</p>
                  </div>
                </button>
              )
            }}
          />
        </div>
      );
    }
  });

  component.unmount(() => {
    searchAlbums('');
  });

  return component;
};

export default LibraryAlbums;
