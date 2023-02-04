import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import PlayerControls from '../../modules/playerControls/playerControls';
import PlayerCover from '../../modules/playerCover/playerCover';
import PlayerMeta from '../../modules/playerMeta/playerMeta';
import PlayerSlider from '../../modules/playerSlider/playerSlider';

import './player.view.scss';

export type PlayerViewProps = {};

const PlayerView: Component<PlayerViewProps> = () => {
  const component = new forgo.Component<PlayerViewProps>({
    render() {
      return (
        <div class='Player'>
          <div class='panel meta'>
            <PlayerCover />
            <PlayerMeta />
            <PlayerSlider />
            <PlayerControls />
          </div>
          <div class='panel'>
            Playlist
          </div>
        </div>
      );
    }
  });

  return component;
};

export default PlayerView;
