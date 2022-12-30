import type { ForgoNewComponentCtor as Component } from 'forgo';
import type { State } from '../../store/store';

import * as forgo from 'forgo';

import Settings from '../settings/settings';
import SplashView from '../../views/app/splash/splash.view';
import AlbumView from '../../views/app/album/album.view';
import { fetchLibrary } from '../../store/actions/library.actions';
import { fetchTheme } from '../../store/actions/theme.actions';
import { fetchUser } from '../../store/actions/user.actions';
import store from '../../store/store';

import './app.scss';

export type AppProps = {};

const App: Component<AppProps> = () => {
  const views: Record<State['view']['app'], forgo.Component> = {
    song: <div>Song</div>,
    album: <AlbumView />,
    label: <div>Label</div>
  };

  const component = new forgo.Component<AppProps>({
    render() {
      const { ready, layout, view } = store.get();

      if (!ready) return <SplashView />;
      if (layout === 'settings') return <Settings />;
      return views[view.app];
    }
  });

  component.mount(async () => {
    await Promise.all([
      fetchLibrary(),
      fetchTheme(),
      fetchUser()
    ]);

    store.dispatch('setReady', true);
  });

  store.subscribe(component, ['ready', 'layout']);

  return component;
};

export default App;
