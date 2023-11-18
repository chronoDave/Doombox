import type { IconProps } from '../../../components/icon/icon';
import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import { AppView } from '../../../../types/views';
import { setRoute } from '../../../actions/route.actions';
import { setViewApp } from '../../../actions/view.actions';
import Icon from '../../../components/icon/icon';
import { Route } from '../../../types/state';
import cx from '../../../utils/cx/cx';

import subscribe from './appNav.state';

import './appNav.scss';

export type AppNavProps = {};

const AppNav: Component<AppNavProps> = () => {
  const views: Record<AppView, IconProps['id']> = {
    [AppView.Playlist]: 'star',
    [AppView.Library]: 'listMusic'
  };

  const component = new forgo.Component<AppNavProps>({
    render() {
      const current = subscribe(component);

      return (
        <nav class='AppNav' aria-label="library">
          {Object.entries(views).map(([id, icon]) => (
            <button
              key={id}
              type='button'
              class={cx(current === id && 'active')}
              aria-label={`${id} view`}
              onclick={() => setViewApp(id as AppView)}
            >
              <Icon id={icon} />
            </button>
          ))}
          <button
            type='button'
            aria-label='Open settings'
            onclick={() => setRoute(Route.Settings)}
          >
            <Icon id='cog' />
          </button>
        </nav>
      );
    }
  });

  return component;
};

export default AppNav;
