import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import { AppView } from '../../../../types/views';
import Library from '../../library/library';
import AppPlaylist from '../appPlaylist/appPlaylist';

import subscribe from './appRouter.state';

export type AppRouterProps = {};

const AppRouter: Component<AppRouterProps> = () => {
  const views: Record<AppView, forgo.Component> = {
    [AppView.Library]: <Library />,
    [AppView.Playlist]: <AppPlaylist />
  };

  const component = new forgo.Component<AppRouterProps>({
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

export default AppRouter;
