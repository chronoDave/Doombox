import type { Song } from '../../../types/library';
import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import { play } from '../../actions/player.actions';
import Glyph from '../glyph/glyph';
import VirtualList from '../virtualList/virtualList';

import './listSong.scss';

export type ListSongProps = {
  songs: Song[]
};

const ListSong: Component<ListSongProps> = () => {
  const component = new forgo.Component<ListSongProps>({
    render(props) {
      return (
        <VirtualList
          data={props.songs}
          onclick={(action, id) => play(id)}
          cell={{
            id: cell => cell._id,
            height: () => 52,
            render: cell => (
              <button
                class='ListSong'
                type='button'
                data-id={cell._id}
                data-action='song-play'
              >
                <p class='title nowrap'>{cell.title}</p>
                <p class='subtitle nowrap'>{cell.artist}<Glyph id='dot' />{cell.album}</p>
              </button>
            )
          }}
        />
      );
    }
  });

  return component;
};

export default ListSong;
