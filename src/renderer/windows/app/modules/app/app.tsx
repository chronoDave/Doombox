import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import Window from '@doombox/components/window/window';

import { fetchCache } from '../../actions/cache.actions';
import { fetchLibrary } from '../../actions/library.actions';
import { fetchPlaylists } from '../../actions/playlist.actions';
import { setRouteApp } from '../../actions/route.actions';
import { fetchTheme } from '../../actions/theme.actions';
import { fetchUser } from '../../actions/user.actions';
import * as Route from '../../types/route';

import subscribe from './app.state';
import AppRouter from './appRouter/appRouter';

import './app.scss';

export type AppProps = {};

const App: Component<AppProps> = () => {
  const component = new forgo.Component<AppProps>({
    render() {
      const title = subscribe('App', component);

      return (
        <Window
          title={title}
          onminimize={window.ipc.window.minimize}
          onmaximize={window.ipc.window.maximize}
          onclose={window.ipc.window.close}
        >
          <AppRouter />
        </Window>
      );
    }
  });

  component.mount(async () => {
    await Promise.all([
      fetchLibrary(),
      fetchTheme(),
      fetchUser(),
      fetchCache(),
      fetchPlaylists()
    ]);

    setRouteApp(Route.App.Home);
  });

  return component;
};

export default App;
