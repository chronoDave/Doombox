import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import VirtualList from '../../../../components/virtualList/virtualList';
import { play } from '../../../actions/player.actions';

import subscribe from './searchSong.state';

import './searchSong.scss';

export type SearchSongProps = {};

const SearchSong: Component<SearchSongProps> = () => {
  const component = new forgo.Component<SearchSongProps>({
    render() {
      const songs = subscribe(component);

      if (songs.length === 0) return <p>No songs found</p>;
      return (
        <VirtualList
          data={songs}
          onclick={play}
          cell={{
            id: song => song._id,
            height: () => 52,
            render: song => (
              <button class='SearchSong button' type='button'>
                <img
                  src={song.image!}
                  alt=''
                  width={48}
                  height={48}
                />
                <div class='body'>
                  <p class='title nowrap'>{song.title}</p>
                  <p class='subtitle nowrap'>{song.artist}</p>
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

export default SearchSong;
