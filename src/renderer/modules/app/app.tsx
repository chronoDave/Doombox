import type { IconProps } from '../../components/icon/icon';
import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import { AppView } from '../../../types/views';
import Icon from '../../components/icon/icon';
import { fetchDirectory, setReady } from '../../state/actions/app.actions';
import { fetchCache } from '../../state/actions/cache.actions';
import { fetchLibrary } from '../../state/actions/library.actions';
import { fetchTheme } from '../../state/actions/theme.actions';
import { fetchUser } from '../../state/actions/user.actions';
import { setViewApp } from '../../state/actions/view.actions';
import { readySelector, scanningSelector } from '../../state/selectors/app.selectors';
import { appViewSelector } from '../../state/selectors/view.selectors';
import cx from '../../utils/cx/cx';
import AlbumView from '../../views/album/album.view';
import LabelView from '../../views/label/label.view';
import PlayerView from '../../views/player/player.view';
import PlaylistView from '../../views/playlist/playlist.view';
import ScanView from '../../views/scan/scan.view';
import SongView from '../../views/song/song.view';
import SplashView from '../../views/splash/splash.view';
import Settings from '../settings/settings';

import './app.scss';

export type AppProps = {};

type Views = Record<AppView, {
  id: AppView,
  view: forgo.Component,
  icon: IconProps['id'],
}>;

const App: Component<AppProps> = () => {
  const views: Views = {
    playlist: { id: AppView.Playlist, view: <PlaylistView />, icon: 'playlistMusic' },
    player: { id: AppView.Player, view: <PlayerView />, icon: 'playCircle' },
    song: { id: AppView.Song, view: <SongView />, icon: 'musicNote' },
    album: { id: AppView.Album, view: <AlbumView />, icon: 'musicBox' },
    label: { id: AppView.Label, view: <LabelView />, icon: 'accountMusic' },
    settings: { id: AppView.Settings, view: <Settings />, icon: 'cog' }
  };

  const component = new forgo.Component<AppProps>({
    render() {
      const ready = readySelector.get();
      const scanning = scanningSelector.get();
      const view = appViewSelector.get();

      if (!ready) return <SplashView />;
      if (scanning) return <ScanView />;
      return (
        <main>
          {views[view].view}
          <nav aria-label="app">
            <ul>
              {Object.values(views).map(({ id, icon }) => (
                <li key={id} class={cx({ active: id === view })}>
                  <button
                    type='button'
                    aria-label={`navigate to library ${id}`}
                    onclick={() => setViewApp(id)}
                  >
                    <Icon id={icon} />
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </main>
      );
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
