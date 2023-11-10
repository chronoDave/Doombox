import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import { setRoute } from '../../actions/route.actions';
import Icon from '../../components/icon/icon';
import { Route } from '../../types/state';

import SettingsNavigation from './settingsNavigation/settingsNavigation';
import SettingsRouter from './settingsRouter/settingsRouter';

import './settings.scss';

export type SettingsViewProps = {};

const SettingsView: Component<SettingsViewProps> = () => {
  const component = new forgo.Component<SettingsViewProps>({
    render() {
      return (
        <main class='Settings'>
          <SettingsNavigation />
          <SettingsRouter />
          <div class='actions'>
            <button
              type='button'
              aria-label='Close settings'
              onclick={() => setRoute(Route.Library)}
            >
              <Icon id='close' />
              Esc
            </button>
          </div>
        </main>
      );
    }
  });

  return component;
};

export default SettingsView;
