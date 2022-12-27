import type { ForgoNewComponentCtor as Component } from 'forgo';
import type { AppView } from '../../state/slices/app.slice';

import * as forgo from 'forgo';

import SplashView from '../../views/splash/splash.view';
import AlbumView from '../../views/album/album.view';
import Settings from '../settings/settings';
import * as state from '../../state/state';

import './app.scss';

export type AppProps = {};

const App: Component<AppProps> = () => {
  const views: Record<AppView, forgo.Component> = {
    album: <AlbumView />
  };

  const component = new forgo.Component<AppProps>({
    render() {
      if (!state.app.ready) return <SplashView />;
      if (state.settings.open) return <Settings />;
      return views[state.app.view];
    }
  });

  component.mount(async () => {
    state.emitter.on('settings.setOpen', () => component.update());

    await Promise.all([
      state.actions.library.fetchSongs(),
      state.actions.theme.fetchTheme(),
      state.actions.user.fetchUser()
    ]);

    if (state.user.shape.library.folders.length === 0) {
      state.actions.library.setEmpty(true);
    }

    state.actions.app.setReady(true);
    component.update();
  });

  return component;
};

export default App;
