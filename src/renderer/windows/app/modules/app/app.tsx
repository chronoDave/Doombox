import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import Window from '@doombox/components/window/window';

import { fetchPath } from '../../state/actions/app.actions';
import { fetchCache } from '../../state/actions/cache.actions';
import { fetchLibrary } from '../../state/actions/library.actions';
import { fetchPlaylists } from '../../state/actions/playlist.actions';
import { setRouteApp } from '../../state/actions/route.actions';
import { fetchTheme } from '../../state/actions/theme.actions';
import { fetchUser } from '../../state/actions/user.actions';
import * as Route from '../../state/route';

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
