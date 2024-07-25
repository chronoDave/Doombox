import type { IconProps } from '@doombox/components/icon/icon';
import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import Icon from '@doombox/components/icon/icon';
import cx from '@doombox/renderer/css/cx';

import { Route } from '../../../state/state';

import subscribe, { setRoute } from './navigation.state';

import './navigation.scss';

export type NavigationProps = {};

const Navigation: Component<NavigationProps> = () => {
  const routes: Record<Route, IconProps['id']> = {
    [Route.Appearance]: 'palette',
    [Route.Player]: 'play-circle',
    [Route.Library]: 'playlist-music'
  } as const;

  const component = new forgo.Component<NavigationProps>({
    render() {
      const active = subscribe(component);

      return (
        <nav class='Navigation'>
          {Object.entries(routes).map(([route, icon]) => (
            <button
              key={route}
              class={cx('button', route === active && 'active')}
              type='button'
              aria-label={route}
              onclick={() => setRoute(route as Route)}
            >
              <Icon id={icon} />
            </button>
          ))}
        </nav>
      );
    }
  });

  return component;
};

export default Navigation;
