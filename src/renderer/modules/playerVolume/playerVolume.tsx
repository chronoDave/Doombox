import type { IconProps } from '../../components/icon/icon';
import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import Icon from '../../components/icon/icon';
import { createPopup } from '../../components/popup/popup';
import { playerMutedSelector, playerVolumeSelector } from '../../state/selectors/player.selectors';
import VolumeSlider from '../volumeSlider/volumeSlider';

import './playerVolume.scss';

export type PlayerVolumeProps = {};

const PlayerVolume: Component<PlayerVolumeProps> = () => {
  let popup: null | (() => void);

  const component = new forgo.Component<PlayerVolumeProps>({
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
                position: 'top-left'
              }, <VolumeSlider />);
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

  playerMutedSelector.subscribe(component);
  playerVolumeSelector.subscribe(component);

  return component;
};

export default PlayerVolume;
