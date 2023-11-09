import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import secToTime from '../../../utils/time/secToTime';
import timeToHhMmSs from '../../../utils/time/timeToHhMmSs';
import { seek } from '../../actions/player.actions';
import Slider from '../../components/slider/slider';

import subscribe from './playerSlider.state';

import './playerSlider.scss';

export type PlayerSliderProps = {};

const PlayerSlider: Component<PlayerSliderProps> = () => {
  const component = new forgo.Component<PlayerSliderProps>({
    render() {
      const { position, duration } = subscribe(component);

      return (
        <div class='PlayerSlider'>
          <span class="small">{timeToHhMmSs(secToTime(position))}</span>
          <Slider
            max={duration}
            value={position}
            ariaValue={x => timeToHhMmSs(secToTime(x))}
            onchange={seek}
          />
          <span class="small">-{timeToHhMmSs(secToTime(duration - position))}</span>
        </div>
      );
    }
  });

  return component;
};

export default PlayerSlider;
