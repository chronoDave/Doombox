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
import useMediaQuery from '../../../hooks/useMediaQuery';
import cx from '../../../utils/cx/cx';
import createMediaQuery from '../../../utils/mediaQuery';

import subscribe from './library.state';

import './library.scss';

export type LibraryProps = {};

const Library: Component<LibraryProps> = () => {
  let width = 0;

  const component = new forgo.Component<LibraryProps>({
    render() {
      const { albums, current } = subscribe(component);
      const duration = sum(albums, album => album.duration ?? 0);

      return (
        <div class="Library">
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
              width,
              height: width * 0.25,
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

  useMediaQuery([
    createMediaQuery({ axis: 'min-width', breakpoint: 'xs-w' }, { axis: 'min-height', breakpoint: 'xs-h' }),
    createMediaQuery({ axis: 'min-width', breakpoint: 'sm-w' }, { axis: 'min-height', breakpoint: 'sm-h' }),
    createMediaQuery({ axis: 'min-width', breakpoint: 'md-w' }, { axis: 'min-height', breakpoint: 'md-h' }),
    createMediaQuery({ axis: 'min-width', breakpoint: 'lg-w' }, { axis: 'min-height', breakpoint: 'lg-h' }),
    createMediaQuery({ axis: 'min-width', breakpoint: 'xl-w' }, { axis: 'min-height', breakpoint: 'xl-h' })
  ])(i => {
    width = 192 + 64 * i;
  })(component);

  return component;
};

export default Library;
