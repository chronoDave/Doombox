import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import { fetchDirectory } from '../../actions/app.actions';
import { fetchCache } from '../../actions/cache.actions';
import { fetchLibrary } from '../../actions/library.actions';
import { fetchPlaylists } from '../../actions/playlist.actions';
import { setRoute } from '../../actions/route.actions';
import { fetchTheme } from '../../actions/theme.actions';
import { fetchUser } from '../../actions/user.actions';
import { Route } from '../../types/state';

import WindowBar from './windowBar/windowBar';
import WindowRouter from './windowRouter/windowRouter';

import './window.scss';

export type WindowProps = {};

const Window: Component<WindowProps> = () => {
  const component = new forgo.Component<WindowProps>({
    render() {
      return [
        <WindowBar />,
        <WindowRouter />
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

    setRoute(Route.App);
  });

  return component;
};

export default Window;
