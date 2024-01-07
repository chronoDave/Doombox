import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import * as Route from '../../../types/route';
import Home from '../../home/home';
import Load from '../../load/load';
import Scan from '../../scan/scan';

import subscribe from './appRouter.state';

export type AppRouterProps = {};

const AppRouter: Component<AppRouterProps> = () => {
  const views: Record<Route.App, forgo.Component> = {
    [Route.App.Load]: <Load />,
    [Route.App.Scan]: <Scan />,
    [Route.App.Home]: <Home />
  };

  const component = new forgo.Component<AppRouterProps>({
    render() {
      const view = subscribe(component);

      return views[view];
    }
  });

  return component;
};

export default AppRouter;
