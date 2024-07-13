import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import './progress.scss';

export type ProgressProps = {
  value: number
  max: number
  label: string
};

const Progress: Component<ProgressProps> = () => {
  const component = new forgo.Component<ProgressProps>({
    render(props) {
      const value = props.value / props.max;
      const valueText = `${Math.round(value * 100)}%`;

      return (
        <div class='progress'>
          <progress
            value={props.value}
            max={props.max}
            style={{ '--progress-value': value }}
            aria-valuetext={valueText}
          />
          <span class='text'>{valueText}</span>
        </div>
      );
    }
  });

  return component;
};

export default Progress;
