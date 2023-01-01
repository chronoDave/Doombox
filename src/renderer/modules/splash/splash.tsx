import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import './splash.scss';

export type SplashViewProps = {};

const SplashView: Component<SplashViewProps> = () => {
  const bars = 10;

  const component = new forgo.Component<SplashViewProps>({
    render() {
      return (
        <div class="Splash">
          <div
            class="loader"
            aria-hidden="true"
            style={{ '--loader-equalizer-n': bars }}
          >
            {Array.from({ length: bars }).map((_, i) => (
              <div
                class="bar"
                style={{ 'animation-delay': `-${i * 60}ms` }}
              />
            ))}
          </div>
          <h1 class="title">Loading...</h1>
        </div>
      );
    }
  });

  return component;
};

export default SplashView;
