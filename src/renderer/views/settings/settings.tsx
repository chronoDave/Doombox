import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import { setRouteApp } from '../../actions/route.actions';
import Icon from '../../components/icon/icon';
import * as Route from '../../types/route';

import SettingsNav from './settingsNav/settingsNav';
import SettingsRouter from './settingsRouter/settingsRouter';

import './settings.scss';

export type SettingsViewProps = {};

const SettingsView: Component<SettingsViewProps> = () => {
  const component = new forgo.Component<SettingsViewProps>({
    render() {
      return (
        <div class='Settings'>
          <SettingsNav />
          <SettingsRouter />
          <div class='actions'>
            <button
              type='button'
              aria-label='Close settings'
              onclick={() => setRouteApp(Route.App.Home)}
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
