import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import Window from '@doombox/components/window/window';

import Navigation from './navigation/navigation';
import Router from './router/router';

import './settings.scss';

export type SettingsProps = {};

const Settings: Component<SettingsProps> = () => {
  const component = new forgo.Component<SettingsProps>({
    render() {
      return (
        <Window
          title='Settings'
          onclose={window.ipc.window.close}
          onminimize={window.ipc.window.minimize}
          onmaximize={window.ipc.window.maximize}
        >
          <main class='Settings'>
            <Navigation />
            <Router />
          </main>
        </Window>
      );
    }
  });

  return component;
};

export default Settings;
