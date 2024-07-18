import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import VirtualList from '@doombox/components/virtual-list/virtual-list';

import { addAlbumToQueue, playAlbum } from '../../../state/actions/queue.actions';

import subscribe from './searchAlbum.state';

import './searchAlbum.scss';

export type SearchAlbumProps = {};

const SearchAlbum: Component<SearchAlbumProps> = () => {
  const component = new forgo.Component<SearchAlbumProps>({
    render() {
      const albums = subscribe(component);

      if (albums.length === 0) return <p>No albums found</p>;
      return (
        <VirtualList
          data={albums}
          onclick={(id, event) => {
            if (event.shiftKey) {
              addAlbumToQueue(id);
            } else {
              playAlbum(id);
            }
          }}
          cell={{
            id: album => album._id,
            height: () => 48,
            render: ({ data: album }) => (
              <button
                class='SearchAlbum button'
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
