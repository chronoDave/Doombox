import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import Navigation from './navigation/navigation';
import Router from './router/router';

import './settings.scss';

export type SettingsProps = {};

const Settings: Component<SettingsProps> = () => {
  const component = new forgo.Component<SettingsProps>({
    render() {
      return (
        <main class='Settings'>
          <Navigation />
          <Router />
        </main>
      );
    }
  });

  return component;
};

export default Settings;
