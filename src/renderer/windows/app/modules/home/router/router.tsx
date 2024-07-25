import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import * as Route from '../../../state/route';
import Library from '../../library/library';
import Playlist from '../../playlist/playlist';
import Search from '../../search/search';

import subscribe from './router.state';

export type RouterProps = {};

const Router: Component<RouterProps> = () => {
  const views: Record<Route.Home, forgo.Component> = {
    [Route.Home.Library]: <Library />,
    [Route.Home.Playlist]: <Playlist />,
    [Route.Home.Search]: <Search />
  };

  const component = new forgo.Component<RouterProps>({
    render() {
      const view = subscribe(component);

      return views[view];
    }
  });

  return component;
};

export default Router;
