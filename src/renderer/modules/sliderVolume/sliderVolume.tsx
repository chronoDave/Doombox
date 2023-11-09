import type { IconProps } from '../../components/icon/icon';
import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import { setVolume, mute } from '../../actions/player.actions';
import Icon from '../../components/icon/icon';
import Slider from '../../components/slider/slider';

import subscribe from './sliderVolume.state';

import './sliderVolume.scss';

export type SliderVolumeProps = {};

const SliderVolume: Component<SliderVolumeProps> = () => {
  const component = new forgo.Component<SliderVolumeProps>({
    render() {
      const { muted, volume } = subscribe(component);

      const getIcon = (): IconProps['id'] => {
        if (muted) return 'volumeOff';
        if (volume >= 66) return 'volumeHigh';
        if (volume >= 33) return 'volumeMedium';
        return 'volumeLow';
      };

      return (
        <div class='SliderVolume'>
          <button type='button' onclick={() => mute()}>
            <Icon id={getIcon()} />
          </button>
          <Slider value={volume} onchange={setVolume} />
          <span>{Math.round(volume)}</span>
        </div>
      );
    }
  });

  return component;
};

export default SliderVolume;
