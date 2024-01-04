import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import { play } from '../../../actions/player.actions';
import Glyph from '../../../components/glyph/glyph';
import VirtualList from '../../../components/virtualList/virtualList';

import subscribe from './librarySearchSong.state';

import './librarySearchSong.scss';

export type SearchSongProps = {};

const SearchSong: Component<SearchSongProps> = () => {
  const component = new forgo.Component<SearchSongProps>({
    render() {
      const songs = subscribe(component);

      if (songs.length === 0) return <p>No songs found</p>;
      return (
        <VirtualList
          data={songs}
          onclick={data => data.id && play(data.id)}
          cell={{
            id: song => song._id,
            height: () => 52,
            data: song => ({
              id: song._id
            }),
            render: song => (
              <button class='LibrarySearchSong' type='button'>
                <p class='title nowrap'>{song.title}</p>
                <p class='subtitle nowrap'>{song.artist}<Glyph id='dot' />{song.album}</p>
              </button>
            )
          }}
        />
      );
    }
  });

  return component;
};

export default SearchSong;
