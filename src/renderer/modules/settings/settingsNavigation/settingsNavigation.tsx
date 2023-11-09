import type { IconProps } from '../../../components/icon/icon';
import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import { SettingsView } from '../../../../types/views';
import { setViewSettings } from '../../../actions/view.actions';
import Icon from '../../../components/icon/icon';
import cx from '../../../utils/cx/cx';

import subscribe from './settingsNavigation.state';

import './settingsNavigation.scss';

export type SettingsNavigationProps = {};

const SettingsNavigation: Component<SettingsNavigationProps> = () => {
  const routes: Record<SettingsView, IconProps['id']> = {
    [SettingsView.Appearance]: 'palette',
    [SettingsView.Library]: 'listMusic'
  };

  const component = new forgo.Component<SettingsNavigationProps>({
    render() {
      const active = subscribe(component);

      return (
        <nav class='SettingsNavigation'>
          <ul>
            {Object.entries(routes).map(([view, icon]) => (
              <li key={view} class={cx(view === active && 'active')}>
                <button
                  type='button'
                  aria-label={view}
                  onclick={() => setViewSettings(view as SettingsView)}
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

export default SettingsNavigation;
