import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import { AppView } from '../../../types/views';
import { fetchDirectory, setReady } from '../../state/actions/app.actions';
import { fetchCache } from '../../state/actions/cache.actions';
import { fetchLibrary } from '../../state/actions/library.actions';
import { fetchTheme } from '../../state/actions/theme.actions';
import { fetchUser } from '../../state/actions/user.actions';
import { readySelector, scanningSelector } from '../../state/selectors/app.selectors';
import { appViewSelector } from '../../state/selectors/view.selectors';
import AlbumView from '../../views/album/album.view';
import LabelView from '../../views/label/label.view';
import PlayerView from '../../views/player/player.view';
import QueueView from '../../views/queue/queue.view';
import ScanView from '../../views/scan/scan.view';
import SettingsView from '../../views/settings/settings.view';
import SongView from '../../views/song/song.view';
import SplashView from '../../views/splash/splash.view';

import AppHeader from './appHeader/appHeader';
import AppNavigation from './appNavigation/appNavigation';

export type AppProps = {};

const App: Component<AppProps> = () => {
  const views: Record<AppView, forgo.Component> = {
    [AppView.Queue]: <QueueView />,
    [AppView.Player]: <PlayerView />,
    [AppView.Song]: <SongView />,
    [AppView.Album]: <AlbumView />,
    [AppView.Label]: <LabelView />,
    [AppView.Settings]: <SettingsView />
  };

  const component = new forgo.Component<AppProps>({
    render() {
      const ready = readySelector.get();
      const scanning = scanningSelector.get();
      const view = appViewSelector.get();

      if (!ready) return <SplashView />;
      if (scanning) return <ScanView />;
      return [
        <AppHeader />,
        <main>
          <AppNavigation />
          {views[view]}
        </main>
      ];
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
  appViewSelector.subscribe(component);

  return component;
};

export default App;
