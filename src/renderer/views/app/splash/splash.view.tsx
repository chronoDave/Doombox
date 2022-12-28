import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import LoaderEqualizer from '../../../components/loader/equalizer/loader.equalizer';

import './splash.view.scss';

export type SplashViewProps = {};

const SplashView: Component<SplashViewProps> = () => {
  const component = new forgo.Component<SplashViewProps>({
    render() {
      return (
        <div class="SplashView">
          <LoaderEqualizer bars={16} />
          <h1 class="title">Loading...</h1>
        </div>
      );
    }
  });

  return component;
};

export default SplashView;
