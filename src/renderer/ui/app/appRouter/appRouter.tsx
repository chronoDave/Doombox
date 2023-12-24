import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import * as Route from '../../../types/route';

import subscribe from './appRouter.state';
import Home from '../../home/home';
import Scan from '../../scan/scan';
import Load from '../../load/load';

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
