import type { Album } from '../../../types/library';
import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import { playAlbum } from '../../actions/queue.actions';
import VirtualList from '../virtualList/virtualList';

import './listAlbum.scss';

export type ListAlbumProps = {
  albums: Album[]
};

const ListAlbum: Component<ListAlbumProps> = () => {
  const component = new forgo.Component<ListAlbumProps>({
    render(props) {
      return (
        <VirtualList
          data={props.albums}
          onclick={(action, id) => playAlbum(id)}
          cell={{
            id: cell => cell._id,
            height: () => 48,
            render: cell => <div class='ListAlbum'>{cell.album}</div>
          }}
        />
      );
    }
  });

  return component;
};

export default ListAlbum;
