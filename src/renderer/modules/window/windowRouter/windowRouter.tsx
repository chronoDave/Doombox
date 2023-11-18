import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import { Route } from '../../../types/state';
import App from '../../app/app';
import Load from '../../load/load';
import Scan from '../../scan/scan';
import Settings from '../../settings/settings';

import subscribe from './windowRouter.state';

export type WindowRouterProps = {};

const WindowRouter: Component<WindowRouterProps> = () => {
  const routes: Record<Route, forgo.Component> = {
    [Route.Load]: <Load />,
    [Route.Scan]: <Scan />,
    [Route.App]: <App />,
    [Route.Settings]: <Settings />
  };

  const component = new forgo.Component<WindowRouterProps>({
    render() {
      const route = subscribe(component);

      return routes[route];
    }
  });

  return component;
};

export default WindowRouter;
