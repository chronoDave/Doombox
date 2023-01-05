import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import { fetchLibrary } from '../../store/actions/library.actions';
import { fetchTheme } from '../../store/actions/theme.actions';
import { fetchUser } from '../../store/actions/user.actions';
import store from '../../store/store';
import Library from '../library/library';
import Settings from '../settings/settings';
import Splash from '../splash/splash';

import AppHeader from './components/header/app.header';

import './app.scss';

export type AppProps = {};

const App: Component<AppProps> = () => {
  const component = new forgo.Component<AppProps>({
    render() {
      const { ready, layout } = store.get();

      return [
        <AppHeader />,
        (() => {
          if (!ready) return <Splash />;
          if (layout === 'settings') return <Settings />;
          return <Library />;
        })()
      ];
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

  return store.subscribe(component, ['ready', 'layout']);
};

export default App;
