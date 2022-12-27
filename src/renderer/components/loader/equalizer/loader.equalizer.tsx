import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import { intRandom } from '../../../../utils/number';

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
                'animation-delay': `-${intRandom(0, 777)}ms`
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
