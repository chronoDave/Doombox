import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import './splash.view.scss';

export type SplashViewProps = {};

const SplashView: Component<SplashViewProps> = () => {
  const component = new forgo.Component<SplashViewProps>({
    render() {
      return (
        <div class="SplashView">SplashView</div>
      );
    }
  });

  return component;
};

export default SplashView;
