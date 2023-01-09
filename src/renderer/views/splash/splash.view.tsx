import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import { useMediaQueryList } from '../../hooks/useMediaQuery';

import './splash.view.scss';

export type SplashViewProps = {};

const SplashView: Component<SplashViewProps> = () => {
  const ref: forgo.ForgoRef<Element> = {};
  let bars = 12;

  const component = new forgo.Component<SplashViewProps>({
    render() {
      return (
        <div class="Splash">
          <div
            class="loader"
            aria-hidden="true"
            style={{ '--loader-equalizer-n': bars }}
            ref={ref}
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

  useMediaQueryList(
    'min-width',
    ['xs-w', 'sm-w', 'md-w']
  )((_, i) => {
    bars = 12 + (4 * i);

    ref.value?.childNodes.forEach(node => (node as HTMLDivElement).getAnimations()
      .forEach(animation => {
        animation.currentTime = 0;
        animation.play();
      }));
  })(component);

  return component;
};

export default SplashView;
