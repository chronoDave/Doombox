import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import { fetchDirectory } from '../../actions/app.actions';
import { fetchCache } from '../../actions/cache.actions';
import { fetchLibrary } from '../../actions/library.actions';
import { setRoute } from '../../actions/route.actions';
import { fetchTheme } from '../../actions/theme.actions';
import { fetchUser } from '../../actions/user.actions';
import { Route } from '../../types/state';
import LoadView from '../../views/load/load.view';
import MainView from '../../views/main/main.view';
import ScanView from '../../views/scan/scan.view';
import SettingsView from '../../views/settings/settings.view';

import subscribe from './router.state';

export type RouterProps = {};

const Router: Component<RouterProps> = () => {
  const routes: Record<Route, forgo.Component> = {
    [Route.Load]: <LoadView />,
    [Route.Scan]: <ScanView />,
    [Route.Main]: <MainView />,
    [Route.Settings]: <SettingsView />
  };

  const component = new forgo.Component<RouterProps>({
    render() {
      const route = subscribe(component);

      return routes[route];
    }
  });

  component.mount(async () => {
    await Promise.all([
      fetchLibrary(),
      fetchTheme(),
      fetchUser(),
      fetchCache(),
      fetchDirectory()
    ]);

    setRoute(Route.Main);
  });

  return component;
};

export default Router;
