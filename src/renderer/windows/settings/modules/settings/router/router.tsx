import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import { Route } from '../../../state/state';
import Appearance from '../../appearance/appearance';
import Library from '../../library/library';
import Player from '../../player/player';

import subscribe from './router.state';

export type RouterProps = {};

export type Page = {
  title: string
  view: forgo.Component
};

const Router: Component<RouterProps> = () => {
  const routes: Record<Route, Page> = {
    [Route.Appearance]: {
      title: 'Appearance',
      view: <Appearance />
    },
    [Route.Library]: {
      title: 'Library',
      view: <Library />
    },
    [Route.Player]: {
      title: 'Player',
      view: <Player />
    }
  };

  const component = new forgo.Component<RouterProps>({
    render() {
      const route = subscribe(component);

      return (
        <section class='panel column'>
          <h1>{routes[route].title}</h1>
          {routes[route].view}
        </section>
      );
    }
  });

  return component;
};

export default Router;
