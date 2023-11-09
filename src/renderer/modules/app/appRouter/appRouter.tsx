import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import { fetchDirectory } from '../../../actions/app.actions';
import { fetchCache } from '../../../actions/cache.actions';
import { fetchLibrary } from '../../../actions/library.actions';
import { setRoute } from '../../../actions/route.actions';
import { fetchTheme } from '../../../actions/theme.actions';
import { fetchUser } from '../../../actions/user.actions';
import { Route } from '../../../types/state';
import Library from '../../library/library';
import Load from '../../load/load';
import Scan from '../../scan/scan';
import Settings from '../../settings/settings';

import subscribe from './appRouter.state';

export type RouterProps = {};

const Router: Component<RouterProps> = () => {
  const routes: Record<Route, forgo.Component> = {
    [Route.Load]: <Load />,
    [Route.Scan]: <Scan />,
    [Route.Library]: <Library />,
    [Route.Settings]: <Settings />
  };

  const component = new forgo.Component<RouterProps>({
    render() {
      const route = subscribe(component);

      return routes[route];
    }
  });

  component.mount(async () => {
    await Promise.all([
      fetchLibrary(),
      fetchTheme(),
      fetchUser(),
      fetchCache(),
      fetchDirectory()
    ]);

    setRoute(Route.Library);
  });

  return component;
};

export default Router;
