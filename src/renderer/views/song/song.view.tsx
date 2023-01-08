import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import { formatTimeNumber } from '../../../utils/string/formatTime';
import VirtualList from '../../components/virtualList/virtualList';
import store from '../../store/store';

import './song.view.scss';

export type SongViewProps = {};

const SongView: Component<SongViewProps> = () => {
  const component = new forgo.Component<SongViewProps>({
    render() {
      const { library } = store.get();

      return (
        <div class="SongView">
          <h1>All songs</h1>
          <p>{library.songs.map.size} songs</p>
          <VirtualList
            size={library.songs.list.length}
            overflow={3}
            height={42}
            render={i => {
              const song = library.songs.list[i];

              return [
                <img
                  src={song.image.thumbs ?? 'icons/icon_light.png'}
                  alt=''
                  loading='lazy'
                />,
                <div class='metadata'>
                  <p>{song.title}</p>
                  <p>{song.artist}</p>
                </div>,
                <div class='duration'>
                  <p>{formatTimeNumber(song.duration ?? 0, 2)}</p>
                </div>
              ];
            }}
          />
        </div>
      );
    }
  });

  return component;
};

export default SongView;
