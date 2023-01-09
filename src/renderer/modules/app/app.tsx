import type { IconProps } from '../../components/icon/icon';
import type { State } from '../../store/state';
import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import { fetchLibrary } from '../../actions/library.actions';
import { fetchTheme } from '../../actions/theme.actions';
import { fetchUser } from '../../actions/user.actions';
import { setViewApp } from '../../actions/view.actions';
import Icon from '../../components/icon/icon';
import store from '../../store/store';
import cx from '../../utils/cx';
import AlbumView from '../../views/album/album.view';
import LabelView from '../../views/label/label.view';
import PlayerView from '../../views/player/player.view';
import PlaylistView from '../../views/playlist/playlist.view';
import SongView from '../../views/song/song.view';
import SplashView from '../../views/splash/splash.view';
import Settings from '../settings/settings';

import './app.scss';

export type AppProps = {};

type Views = Record<State['view']['app'], {
  id: State['view']['app'],
  view: forgo.Component,
  icon: IconProps['id'],
}>;

const App: Component<AppProps> = () => {
  const views: Views = {
    playlist: { id: 'playlist', view: <PlaylistView />, icon: 'playlistMusic' },
    player: { id: 'player', view: <PlayerView />, icon: 'playCircle' },
    song: { id: 'song', view: <SongView />, icon: 'musicNote' },
    album: { id: 'album', view: <AlbumView />, icon: 'musicBox' },
    label: { id: 'label', view: <LabelView />, icon: 'accountMusic' },
    settings: { id: 'settings', view: <Settings />, icon: 'cog' }
  };

  const component = new forgo.Component<AppProps>({
    render() {
      const { app, view } = store.get();

      if (!app.ready) return <SplashView />;
      return (
        <main>
          {views[view.app].view}
          <nav aria-label="app">
            <ul>
              {Object.values(views).map(({ id, icon }) => (
                <li key={id} class={cx({ active: id === store.get().view.app })}>
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
      fetchUser()
    ]);

    // store.dispatch('setReady', true);
  });

  return store.subscribe(component, ['app.ready', 'view']);
};

export default App;
