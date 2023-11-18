import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import { AppView } from '../../../../types/views';
import Library from '../../library/library';
import LibraryPlaylist from '../libraryPlaylist/libraryPlaylist';

import subscribe from './libraryRouter.state';

export type LibraryRouterProps = {};

const LibraryRouter: Component<LibraryRouterProps> = () => {
  const views: Record<AppView, forgo.Component> = {
    [AppView.Library]: <Library />,
    [AppView.Playlist]: <LibraryPlaylist />
  };

  const component = new forgo.Component<LibraryRouterProps>({
    render() {
      const view = subscribe(component);

      return (
        <div class='body'>
          {views[view]}
        </div>
      );
    }
  });

  return component;
};

export default LibraryRouter;
