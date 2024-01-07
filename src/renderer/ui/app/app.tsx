import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import { fetchDirectory } from '../../actions/app.actions';
import { fetchCache } from '../../actions/cache.actions';
import { fetchLibrary } from '../../actions/library.actions';
import { fetchPlaylists } from '../../actions/playlist.actions';
import { setRouteApp } from '../../actions/route.actions';
import { fetchTheme } from '../../actions/theme.actions';
import { fetchUser } from '../../actions/user.actions';
import * as Route from '../../types/route';

import AppBar from './appBar/appBar';
import AppRouter from './appRouter/appRouter';

import './app.scss';

export type AppProps = {};

const App: Component<AppProps> = () => {
  const component = new forgo.Component<AppProps>({
    render() {
      return [
        <AppBar />,
        <AppRouter />
      ];
    }
  });

  component.mount(async () => {
    await Promise.all([
      fetchLibrary(),
      fetchTheme(),
      fetchUser(),
      fetchCache(),
      fetchPlaylists(),
      fetchDirectory()
    ]);

    setRouteApp(Route.App.Home);
  });

  return component;
};

export default App;
