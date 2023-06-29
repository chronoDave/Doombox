import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import PlayerControls from './playerControls/playerControls';
import PlayerCover from './playerCover/playerCover';
import PlayerMetadata from './playerMetadata/playerMetadata';
import PlayerSlider from './playerSlider/playerSlider';

export type PlayerViewProps = {};

const PlayerView: Component<PlayerViewProps> = () => {
  const component = new forgo.Component<PlayerViewProps>({
    render() {
      return (
        <div class='View PlayerView'>
          <PlayerCover />
          <div class='panel'>
            <PlayerMetadata />
            <PlayerSlider />
            <PlayerControls />
          </div>
        </div>
      );
    }
  });

  return component;
};

export default PlayerView;
