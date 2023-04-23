import type { IconProps } from '../../components/icon/icon';
import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import Icon from '../../components/icon/icon';
import { createPopup } from '../../components/popup/popup';
import store from '../../state/store';
import createSubscription from '../../utils/subscribe';
import VolumeSlider from '../volumeSlider/volumeSlider';

import './playerVolume.scss';

export type PlayerVolumeProps = {};

const PlayerVolume: Component<PlayerVolumeProps> = () => {
  let popup: () => void;

  const subscribe = createSubscription(store);
  const component = new forgo.Component<PlayerVolumeProps>({
    render() {
      const { player } = store.get();
      const getIcon = (): IconProps['id'] => {
        if (player.muted) return 'mute';
        if (player.volume >= 66) return 'volumeHigh';
        if (player.volume >= 33) return 'volumeMedium';
        return 'volumeLow';
      };

      return (
        <button
          type='button'
          class='PlayerVolume'
          onclick={event => {
            event.stopPropagation();
            popup?.();
            popup = createPopup({
              anchor: event.currentTarget,
              position: 'top-left'
            }, <VolumeSlider />);
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

  return subscribe((prev, cur) => (
    prev.player.muted !== cur.player.muted ||
    prev.player.volume !== cur.player.volume
  ))(component);
};

export default PlayerVolume;
