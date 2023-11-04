import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import PlayerControls from '../../modules/playerControls/playerControls';
import PlayerCover from '../../modules/playerCover/playerCover';
import PlayerMetadata from '../../modules/playerMetadata/playerMetadata';
import PlayerSlider from '../../modules/playerSlider/playerSlider';

import './player.view.scss';

export type PlayerViewProps = {};

const PlayerView: Component<PlayerViewProps> = () => {
  const component = new forgo.Component<PlayerViewProps>({
    render() {
      return (
        <div class='View PlayerView'>
          <PlayerCover />
          <PlayerMetadata />
          <PlayerSlider />
          <PlayerControls />
        </div>
      );
    }
  });

  return component;
};

export default PlayerView;
