import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import { fetchDirectory, setReady } from '../../state/actions/app.actions';
import { fetchCache } from '../../state/actions/cache.actions';
import { fetchLibrary } from '../../state/actions/library.actions';
import { fetchTheme } from '../../state/actions/theme.actions';
import { fetchUser } from '../../state/actions/user.actions';
import { readySelector, scanningSelector, settingsSelector } from '../../state/selectors/app.selectors';
import MainView from '../../views/main/main.view';
import ScanView from '../../views/scan/scan.view';
import SettingsView from '../../views/settings/settings.view';
import SplashView from '../../views/splash/splash.view';

export type RouterProps = {};

const Router: Component<RouterProps> = () => {
  const component = new forgo.Component<RouterProps>({
    render() {
      const ready = readySelector.get();
      const scanning = scanningSelector.get();
      const settings = settingsSelector.get();

      if (!ready) return <SplashView />;
      if (scanning) return <ScanView />;
      if (settings) return <SettingsView />;
      return <MainView />;
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

    setReady(true);
  });

  readySelector.subscribe(component);
  scanningSelector.subscribe(component);
  settingsSelector.subscribe(component);

  return component;
};

export default Router;
