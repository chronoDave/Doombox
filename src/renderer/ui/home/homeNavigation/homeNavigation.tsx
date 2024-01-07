import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import { setRouteHome, setRouteSettings } from '../../../actions/route.actions';
import Icon from '../../../components/icon/icon';
import * as Route from '../../../types/route';
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
                  onclick={() => setRouteHome(Route.Home.Library)}
                  class={cx(!route.settings && route.home === Route.Home.Library && 'active')}
                >
                  <Icon id='boxMusic' />
                </button>
              </li>
              <li>
                <button
                  type='button'
                  aria-label='playlist'
                  onclick={() => setRouteHome(Route.Home.Playlist)}
                  class={cx(!route.settings && route.home === Route.Home.Playlist && 'active')}
                >
                  <Icon id='listMusic' />
                </button>
              </li>
              <li>
                <button
                  type='button'
                  aria-label='settings'
                  onclick={() => setRouteSettings(Route.Settings.Library)}
                  class={cx(route.settings && 'active')}
                >
                  <Icon id='cog' />
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
