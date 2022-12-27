import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import SplashView from '../../views/splash/splash.view';
import state, { init } from '../../state/state';

export type AppProps = {};

const App: Component<AppProps> = () => {
  const component = new forgo.Component<AppProps>({
    render() {
      if (!state.app.ready) return <SplashView />;
      return 'loaded!';
    }
  });

  component.mount(async () => {
    await init();
    component.update();
  });

  return component;
};

export default App;
