import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import * as Routes from '../../../types/route';
import SettingsAppearance from '../settingsAppearance/settingsAppearance';
import SettingsLibrary from '../settingsLibrary/settingsLibrary';

import subscribe from './settingsRouter.state';

export type SettingsRouterProps = {};

const SettingsRouter: Component<SettingsRouterProps> = () => {
  const routes: Record<Routes.Settings, forgo.Component> = {
    [Routes.Settings.Appearance]: <SettingsAppearance />,
    [Routes.Settings.Library]: <SettingsLibrary />
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
