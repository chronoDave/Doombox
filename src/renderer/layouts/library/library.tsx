import type { ForgoNewComponentCtor as Component } from 'forgo';
import type { State } from '../../store/store';

import * as forgo from 'forgo';

import store from '../../store/store';

import AlbumView from './views/album/album.view';
import './library.scss';

export type LibraryProps = {};

const Library: Component<LibraryProps> = () => {
  const views: Record<State['view']['library'], forgo.Component> = {
    song: <div>Song</div>,
    album: <AlbumView />,
    label: <div>Label</div>
  };

  const component = new forgo.Component<LibraryProps>({
    render() {
      const { view } = store.get();

      return views[view.library];
    }
  });

  return store.subscribe(component, ['view.library']);
};

export default Library;
