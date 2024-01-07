import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import { setRouteSettings } from '../../actions/route.actions';
import Icon from '../../components/icon/icon';

import subscribe from './settings.state';
import SettingsNavigation from './settingsNavigation/settingsNavigation';
import SettingsRouter from './settingsRouter/settingsRouter';

import './settings.scss';

export type SettingsViewProps = {};

const SettingsView: Component<SettingsViewProps> = () => {
  const component = new forgo.Component<SettingsViewProps>({
    render() {
      const route = subscribe(component);

      if (!route) return null;
      return (
        <div class='Settings'>
          <SettingsNavigation />
          <SettingsRouter />
          <div class='actions'>
            <button
              type='button'
              aria-label='Close settings'
              onclick={() => setRouteSettings(null)}
            >
              <Icon id='close' />
              Esc
            </button>
          </div>
        </div>
      );
    }
  });

  return component;
};

export default SettingsView;
