import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import PlayerControls from '../playerControls/playerControls';
import PlayerCover from '../playerCover/playerCover';
import PlayerMeta from '../playerMeta/playerMeta';
import PlayerSlider from '../playerSlider/playerSlider';

import './player.scss';

export type PlayerProps = {};

const Player: Component<PlayerProps> = () => {
  const component = new forgo.Component<PlayerProps>({
    render() {
      return (
        <div class='Player'>
          <PlayerCover />
          <div class='body'>
            <PlayerMeta />
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

export default Player;
