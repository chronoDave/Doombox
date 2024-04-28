import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import { Route } from '../../../state/state';
import Appearance from '../../appearance/appearance';
import Library from '../../library/library';

import subscribe from './router.state';

export type RouterProps = {};

const Router: Component<RouterProps> = () => {
  const routes: Record<Route, forgo.Component> = {
    [Route.Appearance]: <Appearance />,
    [Route.Library]: <Library />
  };

  const component = new forgo.Component<RouterProps>({
    render() {
      const route = subscribe(component);

      return (
        <div class='body'>
          {routes[route]}
        </div>
      );
    }
  });

  return component;
};

export default Router;
