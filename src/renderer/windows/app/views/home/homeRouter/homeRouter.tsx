import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import Library from '../../../modules/library/library';
import Playlist from '../../../modules/playlist/playlist';
import Search from '../../../modules/search/search';
import * as Route from '../../../state/route';

import subscribe from './homeRouter.state';

export type HomeRouterProps = {};

const HomeRouter: Component<HomeRouterProps> = () => {
  const views: Record<Route.Home, forgo.Component> = {
    [Route.Home.Library]: <Library />,
    [Route.Home.Playlist]: <Playlist />,
    [Route.Home.Search]: <Search />
  };

  const component = new forgo.Component<HomeRouterProps>({
    render() {
      const view = subscribe(component);

      return views[view];
    }
  });

  return component;
};

export default HomeRouter;
