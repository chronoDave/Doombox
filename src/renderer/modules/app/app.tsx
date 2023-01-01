import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import store from '../../store/store';
import Splash from '../../layouts/splash/splash';
import Settings from '../../layouts/settings/settings';
import Library from '../../layouts/library/library';
import { fetchLibrary } from '../../store/actions/library.actions';
import { fetchTheme } from '../../store/actions/theme.actions';
import { fetchUser } from '../../store/actions/user.actions';

export type AppProps = {};

const App: Component<AppProps> = () => {
  const component = new forgo.Component<AppProps>({
    render() {
      const { ready, layout } = store.get();

      if (!ready) return <Splash />;
      if (layout === 'settings') return <Settings />;
      return <Library />;
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
