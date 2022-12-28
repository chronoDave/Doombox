import type { ForgoNewComponentCtor as Component } from 'forgo';
import type { AppView } from '../../state/slices/app.slice';

import * as forgo from 'forgo';

import Settings from '../settings/settings';
import * as state from '../../state/state';
import SplashView from '../../views/app/splash/splash.view';
import AlbumView from '../../views/app/album/album.view';
import updateOnEvents from '../../utils/updateOnEvents';

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

  updateOnEvents(component, ['settings.setOpen']);

  return component;
};

export default App;
