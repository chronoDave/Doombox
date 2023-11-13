import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import { Thumb } from '../../../../types/library';
import sum from '../../../../utils/array/sum';
import secToTime from '../../../../utils/time/secToTime';
import timeToHhMmSs from '../../../../utils/time/timeToHhMmSs';
import { addToQueue, setQueue } from '../../../actions/queue.actions';
import { searchAlbums } from '../../../actions/search.actions';
import Icon from '../../../components/icon/icon';
import InputSearch from '../../../components/inputSearch/inputSearch';
import VirtualGrid from '../../../components/virtualGrid/virtualGrid';
import cx from '../../../utils/cx/cx';
import VirtualList from '../../../components/virtualList/virtualList';

import subscribe from './libraryAlbums.state';

import './libraryAlbums.scss';

export type LibraryAlbumsProps = {};

const LibraryAlbums: Component<LibraryAlbumsProps> = () => {
  const component = new forgo.Component<LibraryAlbumsProps>({
    render() {
      const { labels, current } = subscribe(component);
      const duration = sum(labels, label => label.duration ?? 0);

      return (
        <div class="LibraryAlbums">
          <InputSearch
            placeholder='search for album'
            onsubmit={query => searchAlbums(query)}
            oninput={query => searchAlbums(query)}
          />
          <div class="toolbar">
            <p class='meta'>
              <span><Icon id='boxesMusic' />{labels.length}</span>
              <span><Icon id='stopwatch' />{timeToHhMmSs(secToTime(duration))}</span>
            </p>
            <div class='actions'>
              <button
                type='button'
                onclick={() => setQueue(labels.map(label => label.songs).flat())}
              >
                <Icon id='listPlay' />
              </button>
            </div>
          </div>
          <VirtualList
            list={labels}
            item={{
              id: label => label._id,
              height: (label, container) => {
                const columns = Math.max(1, Math.floor(container.width / 256));
                const items = Math.max(1, Math.ceil(label.albums.length / columns));

                console.log(label.label, columns);

                return 48 + items * 96;
              },
              render: ({ data: label, container }) => (
                <article style={`--columns: ${Math.floor(container.width / 256)}; --height: ${96}px`}>
                  <div class='header'>
                    <div class='meta'>
                      <p class='nowrap'>{label.label}</p>
                      <p class='nowrap small'>{label.albums.length} albums<span class='dot' aria-hidden='true'>&bull;</span>{timeToHhMmSs(secToTime(label.duration ?? 0))}</p>
                    </div>
                    <div class='actions'>
                      <button type='button' onclick={() => setQueue(label.songs)}>
                        <Icon id='listPlay' />
                      </button>
                      <button type='button' onclick={() => addToQueue(label.songs)}>
                        <Icon id='listAdd' />
                      </button>
                    </div>
                    <span class='hr' aria-hidden='true' />
                  </div>
                  <ol>
                    {label.albums.map(album => (
                      <li key={album._id}>
                        <button type='button' onclick={() => setQueue(album.songs)}>
                          <img src={album.image} alt='' width={96} height={96} />
                        </button>
                        <div class='meta'>
                          <p>{album.album}</p>
                          <p class='small'>{album.albumartist ?? '-'}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </article>
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
