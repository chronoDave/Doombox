import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import secToTime from '../../../utils/time/secToTime';
import timeToHhMmSs from '../../../utils/time/timeToHhMmSs';
import Slider from '../../components/slider/slider';
import { seek } from '../../state/actions/player.actions';
import { playerDurationSelector, playerPositionSelector } from '../../state/selectors/player.selectors';

import './playerSlider.scss';

export type PlayerSliderProps = {};

const PlayerSlider: Component<PlayerSliderProps> = () => {
  const component = new forgo.Component<PlayerSliderProps>({
    render() {
      const duration = playerDurationSelector.get();
      const position = playerPositionSelector.get();

      return (
        <div class='PlayerSlider'>
          <Slider
            min={0}
            step={1}
            max={duration}
            value={position}
            onchange={seek}
          />
          <div class='time'>
            <span>{timeToHhMmSs(secToTime(position))}</span>
            <span>-{timeToHhMmSs(secToTime(duration - position))}</span>
          </div>
        </div>
      );
    }
  });

  playerDurationSelector.subscribe(component);
  playerPositionSelector.subscribe(component);

  return component;
};

export default PlayerSlider;
