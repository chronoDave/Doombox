import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import { fetchDirectory } from '../../state/actions/app.actions';
import { fetchCache } from '../../state/actions/cache.actions';
import { fetchLibrary } from '../../state/actions/library.actions';
import { setRoute } from '../../state/actions/route.actions';
import { fetchTheme } from '../../state/actions/theme.actions';
import { fetchUser } from '../../state/actions/user.actions';
import { routeSelector } from '../../state/selectors/route.selectors';
import { Route } from '../../types/state';
import MainView from '../../views/main/main.view';
import ScanView from '../../views/scan/scan.view';
import SettingsView from '../../views/settings/settings.view';
import SplashView from '../../views/splash/splash.view';

export type RouterProps = {};

const Router: Component<RouterProps> = () => {
  const routes: Record<Route, forgo.Component> = {
    [Route.Load]: <SplashView />,
    [Route.Scan]: <ScanView />,
    [Route.Main]: <MainView />,
    [Route.Settings]: <SettingsView />
  };

  const component = new forgo.Component<RouterProps>({
    render() {
      const route = routeSelector.get();

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

  routeSelector.subscribe(component);

  return component;
};

export default Router;
