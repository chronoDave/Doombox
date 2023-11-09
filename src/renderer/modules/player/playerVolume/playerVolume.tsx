import type { IconProps } from '../../../components/icon/icon';
import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import { mute, setVolume } from '../../../actions/player.actions';
import Icon from '../../../components/icon/icon';
import { createPopup } from '../../../components/popup/popup';
import Slider from '../../../components/slider/slider';

import subscribe from './playerVolume.state';

import './playerVolume.scss';

export type PlayerVolumeProps = {};

const PlayerVolume: Component<PlayerVolumeProps> = () => {
  let popup: null | (() => void);

  const component = new forgo.Component<PlayerVolumeProps>({
    render() {
      const { muted, volume } = subscribe(component);

      const getIcon = (): IconProps['id'] => {
        if (muted) return 'volumeOff';
        if (volume >= 66) return 'volumeHigh';
        if (volume >= 33) return 'volumeMedium';
        return 'volumeLow';
      };

      return (
        <button
          type='button'
          class='PlayerVolume'
          onclick={event => {
            event.stopPropagation();

            if (popup) {
              popup?.();
              popup = null;
            } else {
              popup = createPopup({
                anchor: event.currentTarget,
                position: 'top'
              }, (
                <div class='SliderVolume'>
                  <button type='button' onclick={() => mute()}>
                    <Icon id={getIcon()} />
                  </button>
                  <Slider value={volume} onchange={setVolume} />
                  <span>{Math.round(volume)}</span>
                </div>
              ));
            }
          }}
        >
          <Icon id={getIcon()} />
        </button>
      );
    }
  });

  component.unmount(() => {
    popup?.();
  });

  return component;
};

export default PlayerVolume;
