import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import Queue from '../../modules/queue/queue';

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
          <div class="cover">
          <PlayerCover />
          <Queue />
          </div>
          <div class='panel'>
            <PlayerMetadata />
            <PlayerControls />
            <PlayerSlider />
          </div>
        </div>
      );
    }
  });

  return component;
};

export default PlayerView;
