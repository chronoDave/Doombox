import type { IconProps } from '../../components/icon/icon';
import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import Icon from '../../components/icon/icon';
import Slider from '../../components/slider/slider';
import player from '../../state/player';
import store from '../../state/store';
import createSubscription from '../../utils/subscribe';

import './volumeSlider.scss';

export type VolumeSliderProps = {};

const VolumeSlider: Component<VolumeSliderProps> = () => {
  const subscribe = createSubscription(store);
  const component = new forgo.Component<VolumeSliderProps>({
    render() {
      const getIcon = (): IconProps['id'] => {
        if (player.muted) return 'mute';
        if (player.volume >= 66) return 'volumeHigh';
        if (player.volume >= 33) return 'volumeMedium';
        return 'volumeLow';
      };

      return (
        <div class='VolumeSlider'>
          <button type='button' onclick={() => player.mute()}>
            <Icon id={getIcon()} />
          </button>
          <Slider
            min={0}
            max={100}
            value={player.volume}
            step={1}
            onchange={volume => player.setVolume(volume)}
          />
          <span>{Math.round(player.volume)}</span>
        </div>
      );
    }
  });

  return subscribe((prev, cur) => (
    prev.player.volume !== cur.player.volume ||
    prev.player.muted !== cur.player.muted
  ))(component);
};

export default VolumeSlider;
