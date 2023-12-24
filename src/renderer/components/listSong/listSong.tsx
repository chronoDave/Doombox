import type { Song } from '../../../types/library';
import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import { play } from '../../actions/player.actions';
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
            height: () => 48,
            render: cell => <div class='ListSong'>{cell.title}</div>
          }}
        />
      );
    }
  });

  return component;
};

export default ListSong;
