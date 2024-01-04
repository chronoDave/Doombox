import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import { setRouteHome } from '../../../actions/route.actions';
import Icon from '../../../components/icon/icon';
import { Home as Route } from '../../../types/route';
import cx from '../../../utils/cx/cx';

import subscribe from './homeNavigation.state';

import './homeNavigation.scss';

export type HomeNavigationProps = {};

const HomeNavigation: Component<HomeNavigationProps> = () => {
  const component = new forgo.Component<HomeNavigationProps>({
    render() {
      const route = subscribe(component);

      return (
        <div class='HomeNavigation'>
          <nav aria-label='home'>
            <ul>
              <li>
                <button
                  type='button'
                  aria-label='library'
                  onclick={() => setRouteHome(Route.Library)}
                  class={cx(route === Route.Library && 'active')}
                >
                  <Icon id='boxMusic' />
                </button>
              </li>
              <li>
                <button
                  type='button'
                  aria-label='playlist'
                  onclick={() => setRouteHome(Route.Playlist)}
                  class={cx(route === Route.Playlist && 'active')}
                >
                  <Icon id='listMusic' />
                </button>
              </li>
            </ul>
          </nav>
        </div>
      );
    }
  });

  return component;
};

export default HomeNavigation;
