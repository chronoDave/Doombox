import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import random from '../../../../utils/math/random';

import './loader.equalizer.scss';

export type LoaderEqualizerProps = {
  bars: number
};

const LoaderEqualizer: Component<LoaderEqualizerProps> = () => {
  const component = new forgo.Component<LoaderEqualizerProps>({
    render(props) {
      return (
        <div
          class="LoaderEqualizer"
          aria-hidden="true"
          style={{
            '--loader-equalizer-n': props.bars
          }}
        >
          {Array.from({ length: props.bars }).map(() => (
            <div
              class="bar"
              style={{
                'animation-delay': `-${random(0, 777)}ms`
              }}
            />
          ))}
        </div>
      );
    }
  });

  return component;
};

export default LoaderEqualizer;
