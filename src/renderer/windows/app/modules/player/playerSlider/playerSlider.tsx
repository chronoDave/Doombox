import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import Slider from '@doombox/components/slider/slider';
import Time from '@doombox/lib/time/time';

import { seek } from '../../../actions/player.actions';

import subscribe from './playerSlider.state';

import './playerSlider.scss';

export type PlayerSliderProps = {};

const PlayerSlider: Component<PlayerSliderProps> = () => {
  const component = new forgo.Component<PlayerSliderProps>({
    render() {
      const { position, duration } = subscribe('PlayerSlider', component);

      return (
        <div class='PlayerSlider'>
          <div class='time'>
            <span>{new Time(position).toShort()}</span>
            <span>-{new Time(duration - position).toShort()}</span>
          </div>
          <Slider
            max={duration}
            value={position}
            ariaValue={x => new Time(x).toShort()}
            onchange={seek}
            size={{ track: 6, thumb: 8 }}
          />
        </div>
      );
    }
  });

  return component;
};

export default PlayerSlider;
