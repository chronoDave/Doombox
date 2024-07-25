import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import Window from '@doombox/components/window/window';

import subscribe from './app.state';
import Router from './router/router';

export type AppProps = {};

const App: Component<AppProps> = () => {
  const component = new forgo.Component<AppProps>({
    render() {
      const title = subscribe(component);

      return (
        <Window title={title}>
          <Router />
        </Window>
      );
    }
  });

  return component;
};

export default App;
