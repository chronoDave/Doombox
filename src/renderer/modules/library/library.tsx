import type { State } from '../../store/store';
import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import store from '../../store/store';

import LibraryNavigation from './components/navigation/library.navigation';
import AlbumView from './views/album/album.view';
import LabelView from './views/label/label.view';
import PlayerView from './views/player/player.view';
import PlaylistView from './views/playlist/playlist.view';
import SongView from './views/song/song.view';

import './library.scss';

export type LibraryProps = {};

const Library: Component<LibraryProps> = () => {
  const views: Record<State['view']['library'], forgo.Component> = {
    playlist: <PlaylistView />,
    player: <PlayerView />,
    song: <SongView />,
    album: <AlbumView />,
    label: <LabelView />
  };

  const component = new forgo.Component<LibraryProps>({
    render() {
      const { view } = store.get();

      return (
        <main class="Library">
          {views[view.library]}
          <LibraryNavigation />
        </main>
      );
    }
  });

  return store.subscribe(component, ['view.library']);
};

export default Library;
