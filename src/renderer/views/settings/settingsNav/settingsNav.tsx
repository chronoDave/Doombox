import type { IconProps } from '../../../components/icon/icon';
import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import { setRouteSettings } from '../../../actions/route.actions';
import Icon from '../../../components/icon/icon';
import * as Routes from '../../../types/route';
import cx from '../../../utils/cx/cx';

import subscribe from './settingsNav.state';

import './settingsNav.scss';

export type SettingsNavProps = {};

const SettingsNav: Component<SettingsNavProps> = () => {
  const routes: Record<Routes.Settings, IconProps['id']> = {
    [Routes.Settings.Appearance]: 'palette',
    [Routes.Settings.Library]: 'playlist-music'
  };

  const component = new forgo.Component<SettingsNavProps>({
    render() {
      const active = subscribe(component);

      return (
        <nav class='SettingsNav'>
          <ul>
            {Object.entries(routes).map(([route, icon]) => (
              <li key={route} class={cx(route === active && 'active')}>
                <button
                  type='button'
                  aria-label={route}
                  onclick={() => setRouteSettings(route as Routes.Settings)}
                >
                  <Icon id={icon} />
                </button>
              </li>
            ))}
          </ul>
        </nav>
      );
    }
  });

  return component;
};

export default SettingsNav;
