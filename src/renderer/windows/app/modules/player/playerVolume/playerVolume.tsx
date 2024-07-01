import type { IconProps } from '@doombox/components/icon/icon';
import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import Icon from '@doombox/components/icon/icon';
import debounce from '@doombox/lib/function/debounce';

import { mute, setVolume } from '../../../actions/player.actions';

import subscribe from './playerVolume.state';

import './playerVolume.scss';

export type PlayerVolumeProps = {};

const PlayerVolume: Component<PlayerVolumeProps> = () => {
  const component = new forgo.Component<PlayerVolumeProps>({
    render() {
      const { muted, volume } = subscribe('PlayerVolume', component);
      const handleScroll = debounce((event: forgo.JSX.TargetedWheelEvent<HTMLButtonElement>) => {
        if (event.deltaY !== 0) setVolume(event.deltaY > 0 ? volume - 1 : volume + 1);
      });

      const getIcon = (): IconProps['id'] => {
        if (muted) return 'volume-mute';
        if (volume >= 66) return 'volume-high';
        if (volume >= 33) return 'volume-medium';
        return 'volume-low';
      };

      return (
        <button
          class='PlayerVolume button'
          type='button'
          onclick={() => mute()}
          onwheel={handleScroll}
        >
          <span class='label small'>{volume}</span>
          <Icon id={getIcon()} />
        </button>
      );
    }
  });

  return component;
};

export default PlayerVolume;
