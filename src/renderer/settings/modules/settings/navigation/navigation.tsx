import type { IconProps } from '../../../../components/icon/icon';
import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import Icon from '../../../../components/icon/icon';
import cx from '../../../../lib/css/cx';
import { set } from '../../../state/actions/route';
import { Route } from '../../../state/state';

import subscribe from './navigation.state';

import './navigation.scss';

export type NavigationProps = {};

const Navigation: Component<NavigationProps> = () => {
  const routes: Record<Route, IconProps['id']> = {
    [Route.Appearance]: 'palette',
    [Route.Library]: 'playlist-music'
  };

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
              onclick={() => set(route as Route)}
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
