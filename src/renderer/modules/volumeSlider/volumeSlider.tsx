import type { IconProps } from '../../components/icon/icon';
import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import Icon from '../../components/icon/icon';
import Slider from '../../components/slider/slider';
import { mute, setVolume } from '../../state/actions/player.actions';
import store from '../../state/store';

import './volumeSlider.scss';

export type VolumeSliderProps = {};

const VolumeSlider: Component<VolumeSliderProps> = () => {
  const component = new forgo.Component<VolumeSliderProps>({
    render() {
      const { player } = store.get();
      const getIcon = (): IconProps['id'] => {
        if (player.muted) return 'mute';
        if (player.volume >= 66) return 'volumeHigh';
        if (player.volume >= 33) return 'volumeMedium';
        return 'volumeLow';
      };

      return (
        <div class='VolumeSlider'>
          <button type='button' onclick={mute}>
            <Icon id={getIcon()} />
          </button>
          <Slider
            min={0}
            max={100}
            value={player.volume}
            step={1}
            onchange={setVolume}
          />
          <span>{Math.round(player.volume)}</span>
        </div>
      );
    }
  });

  return store.subscribe(component, (prev, cur) => (
    prev.player.volume !== cur.player.volume ||
    prev.player.muted !== cur.player.muted
  ));
};

export default VolumeSlider;
