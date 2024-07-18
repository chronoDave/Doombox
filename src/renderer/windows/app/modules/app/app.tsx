import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import Window from '@doombox/components/window/window';

import subscribe from './app.state';
import AppRouter from './appRouter/appRouter';

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

  return component;
};

export default App;
