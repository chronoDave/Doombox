import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import { toMinSec, toHourMinSec } from '../../../utils/string/formatTime';
import Slider from '../../components/slider/slider';
import { seek } from '../../state/actions/player.actions';
import store from '../../state/store';
import createSubscription from '../../utils/subscribe';

import './playerSlider.scss';

export type PlayerSliderProps = {};

const PlayerSlider: Component<PlayerSliderProps> = () => {
  const subscribe = createSubscription(store);
  const component = new forgo.Component<PlayerSliderProps>({
    render() {
      const { player } = store.get();
      const format = player.current.duration > (60 * 60) ?
        toHourMinSec :
        toMinSec;

      return (
        <div class='PlayerSlider'>
          <Slider
            min={0}
            step={1}
            max={player.current.duration}
            value={player.current.position}
            onchange={seek}
          />
          <div class='time'>
            <span>{format(player.current.position)}</span>
            <span>-{format(player.current.duration - player.current.position)}</span>
          </div>
        </div>
      );
    }
  });

  return subscribe((prev, cur) => (
    prev.player.current.position !== cur.player.current.position
  ))(component);
};

export default PlayerSlider;
