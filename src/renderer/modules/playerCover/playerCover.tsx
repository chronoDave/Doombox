import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import PlayerControls from '../playerControls/playerControls';
import PlayerSlider from '../playerSlider/playerSlider';

import subscribe from './playerCover.state';

import './playerCover.scss';

export type PlayerCoverProps = {};

const PlayerCover: Component<PlayerCoverProps> = () => {
  const component = new forgo.Component<PlayerCoverProps>({
    render() {
      const { current, src } = subscribe(component);

      return (
        <div class='PlayerCover'>
          <img src={src} alt='' class='bg' />
          <div class='body'>
            <div class='metadata'>
              <p class='nowrap'>{current?.title ?? 'unknown'}</p>
              <p class='small nowrap'>{current?.artist ?? 'unknown'}</p>
            </div>
            <div class='controls'>
              <PlayerControls />
              <PlayerSlider />
            </div>
          </div>
        </div>
      );
    }
  });

  return component;
};

export default PlayerCover;
