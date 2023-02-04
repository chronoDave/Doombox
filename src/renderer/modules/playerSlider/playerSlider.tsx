import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import { formatTimeNumber } from '../../../utils/string/formatTime';
import Slider from '../../components/slider/slider';
import { seek } from '../../state/actions/player.actions';
import store from '../../state/store';

import './playerSlider.scss';

export type PlayerSliderProps = {};

const PlayerSlider: Component<PlayerSliderProps> = () => {
  const component = new forgo.Component<PlayerSliderProps>({
    render() {
      const { player } = store.get();

      return (
        <div class='PlayerSlider'>
          <Slider
            min={0}
            step={1}
            max={player.current.duration}
            size={{
              thumb: 12,
              track: 6
            }}
            value={player.current.position}
            onchange={seek}
          />
          <div class='time'>
            <span>{formatTimeNumber(player.current.position, 2)}</span>
            <span>-{formatTimeNumber(player.current.duration - player.current.position, 2)}</span>
          </div>
        </div>
      );
    }
  });

  return store.subscribe(component, (prev, cur) => (
    prev.player.current.position !== cur.player.current.position
  ));
};

export default PlayerSlider;
