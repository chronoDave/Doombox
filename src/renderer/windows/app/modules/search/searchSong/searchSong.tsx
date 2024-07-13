import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import VirtualList from '@doombox/components/virtual-list/virtual-list';

import { play } from '../../../state/actions/player.actions';
import { addToQueue } from '../../../state/actions/queue.actions';

import subscribe from './searchSong.state';

import './searchSong.scss';

export type SearchSongProps = {};

const SearchSong: Component<SearchSongProps> = () => {
  const component = new forgo.Component<SearchSongProps>({
    render() {
      const songs = subscribe('SearchSong', component);

      if (songs.length === 0) return <p>No songs found</p>;
      return (
        <VirtualList
          data={songs}
          onclick={(id, event) => {
            if (event.shiftKey) {
              addToQueue([id]);
            } else {
              play(id);
            }
          }}
          cell={{
            id: song => song._id,
            height: () => 52,
            render: ({ data: song }) => (
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
