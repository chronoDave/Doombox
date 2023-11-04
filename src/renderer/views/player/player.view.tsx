import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import PlayerControls from '../../modules/playerControls/playerControls';
import PlayerCover from '../../modules/playerCover/playerCover';
import PlayerSlider from '../../modules/playerSlider/playerSlider';
import { playerSongSelector } from '../../state/selectors/player.selectors';

import './player.view.scss';

export type PlayerViewProps = {};

const PlayerView: Component<PlayerViewProps> = () => {
  const component = new forgo.Component<PlayerViewProps>({
    render() {
      const current = playerSongSelector.get();

      return (
        <div class='View PlayerView'>
          <PlayerCover />
          <div class='metadata'>
            <p class='nowrap'>{current?.title ?? 'unknown'}</p>
            <p class='small nowrap'>{current?.artist ?? 'unknown'}</p>
          </div>
          <PlayerSlider />
          <PlayerControls />
        </div>
      );
    }
  });

  playerSongSelector.subscribe(component);

  return component;
};

export default PlayerView;
