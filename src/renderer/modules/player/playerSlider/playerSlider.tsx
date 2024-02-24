import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import secToTime from '../../../../lib/time/secToTime';
import timeToShort from '../../../../lib/time/timeToShort';
import { seek } from '../../../actions/player.actions';
import Slider from '../../../components/slider/slider';

import subscribe from './playerSlider.state';

import './playerSlider.scss';

export type PlayerSliderProps = {};

const PlayerSlider: Component<PlayerSliderProps> = () => {
  const component = new forgo.Component<PlayerSliderProps>({
    render() {
      const { position, duration } = subscribe(component);

      return (
        <div class='PlayerSlider'>
          <div class='time'>
            <span>{timeToShort(secToTime(position))}</span>
            <span>-{timeToShort(secToTime(duration - position))}</span>
          </div>
          <Slider
            max={duration}
            value={position}
            ariaValue={x => timeToShort(secToTime(x))}
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
