import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import Window from '@doombox/components/window/window';

import { fetchPath } from '../../actions/app.actions';
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
        <Window title={title}>
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
      fetchPlaylists(),
      fetchPath()
    ]);

    setRouteApp(Route.App.Home);
  });

  return component;
};

export default App;
