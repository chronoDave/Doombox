import type { IconProps } from '../../components/icon/icon';
import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import Icon from '../../components/icon/icon';
import Slider from '../../components/slider/slider';
import * as player from '../../state/actions/player.actions';
import { playerMutedSelector, playerVolumeSelector } from '../../state/selectors/player.selectors';

import './sliderVolume.scss';

export type SliderVolumeProps = {};

const SliderVolume: Component<SliderVolumeProps> = () => {
  const component = new forgo.Component<SliderVolumeProps>({
    render() {
      const muted = playerMutedSelector.get();
      const volume = playerVolumeSelector.get();

      const getIcon = (): IconProps['id'] => {
        if (muted) return 'mute';
        if (volume >= 66) return 'volumeHigh';
        if (volume >= 33) return 'volumeMedium';
        return 'volumeLow';
      };

      return (
        <div class='SliderVolume'>
          <button type='button' onclick={() => player.mute()}>
            <Icon id={getIcon()} />
          </button>
          <Slider value={volume} onchange={player.volume} />
          <span>{Math.round(volume)}</span>
        </div>
      );
    }
  });

  playerMutedSelector.subscribe(component);
  playerVolumeSelector.subscribe(component);

  return component;
};

export default SliderVolume;
