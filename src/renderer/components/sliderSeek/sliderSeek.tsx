import type { SliderProps } from '../slider/slider';
import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import { formatTimeNumber } from '../../../utils/string/formatTime';
import Slider from '../slider/slider';

import './sliderSeek.scss';

export type SliderSeekProps = Omit<SliderProps, 'min' | 'step' | 'size'>;

const SliderSeek: Component<SliderSeekProps> = () => {
  const component = new forgo.Component<SliderSeekProps>({
    render(props) {
      return (
        <div class='SliderSeek'>
          <Slider
            min={0}
            step={1}
            max={props.max}
            size={{
              thumb: 12,
              track: 6
            }}
            value={props.value}
            onchange={props.onchange}
          />
          <div class='time'>
            <span>{formatTimeNumber(props.value, 2)}</span>
            <span>-{formatTimeNumber(props.max - props.value, 2)}</span>
          </div>
        </div>
      );
    }
  });

  return component;
};

export default SliderSeek;
