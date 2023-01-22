import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import Loader from '../../components/loader/loader';
import { useMediaQueryList } from '../../hooks/useMediaQuery';

import './splash.view.scss';

export type SplashViewProps = {};

const SplashView: Component<SplashViewProps> = () => {
  let bars = 12;

  const component = new forgo.Component<SplashViewProps>({
    render() {
      return (
        <div class="Splash">
          <Loader bars={bars} />
          <h1 class="title">Loading...</h1>
        </div>
      );
    }
  });

  useMediaQueryList('min-width', ['xs-w', 'sm-w', 'md-w', 'lg-w', 'xl-w'])((_, i) => {
    bars = 12 + (i * 6);
  })(component);

  return component;
};

export default SplashView;
