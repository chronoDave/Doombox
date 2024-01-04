import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import { playAlbum } from '../../../actions/queue.actions';
import VirtualList from '../../../components/virtualList/virtualList';

import subscribe from './librarySearchAlbum.state';

import './librarySearchAlbum.scss';

export type SearchAlbumProps = {};

const SearchAlbum: Component<SearchAlbumProps> = () => {
  const component = new forgo.Component<SearchAlbumProps>({
    render() {
      const albums = subscribe(component);

      if (albums.length === 0) return <p>No albums found</p>;
      return (
        <VirtualList
          data={albums}
          onclick={data => data.id && playAlbum(data.id)}
          cell={{
            id: album => album._id,
            height: () => 48,
            render: album => (
              <button
                class='LibrarySearchAlbum'
                type='button'
                data-id={album._id}
              >
                <img
                  src={album.image!}
                  alt=''
                  width={48}
                  height={48}
                />
                <div class='body'>
                  <p class='title nowrap'>{album.album}</p>
                  <p class='subtitle nowrap'>{album.albumartist}</p>
                </div>
              </button>
            )
          }}
        />
      );
    }
  });

  return component;
};

export default SearchAlbum;
