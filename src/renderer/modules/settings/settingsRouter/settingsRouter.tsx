import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import { SettingsView } from '../../../../types/views';
import SettingsAppearance from '../settingsAppearance/settingsAppearance';
import SettingsLibrary from '../settingsLibrary/settingsLibrary';

import subscribe from './settingsRouter.state';

export type SettingsRouterProps = {};

const SettingsRouter: Component<SettingsRouterProps> = () => {
  const routes: Record<SettingsView, forgo.Component> = {
    [SettingsView.Appearance]: <SettingsAppearance />,
    [SettingsView.Library]: <SettingsLibrary />
  };

  const component = new forgo.Component<SettingsRouterProps>({
    render() {
      const route = subscribe(component);

      return (
        <div class='body'>
          {routes[route]}
        </div>
      );
    }
  });

  return component;
};

export default SettingsRouter;
