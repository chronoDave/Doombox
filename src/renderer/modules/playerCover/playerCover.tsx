import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import { Thumb } from '../../../types/library';
import { thumbSelector } from '../../state/selectors/app.selectors';
import { playerSongSelector } from '../../state/selectors/player.selectors';
import PlayerControls from '../playerControls/playerControls';
import PlayerSlider from '../playerSlider/playerSlider';

import './playerCover.scss';

export type PlayerCoverProps = {};

const PlayerCover: Component<PlayerCoverProps> = () => {
  const component = new forgo.Component<PlayerCoverProps>({
    render() {
      const current = playerSongSelector.get();

      const src = thumbSelector.get(Thumb.Player, current?.image);

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

  thumbSelector.subscribe(component);
  playerSongSelector.subscribe(component);

  return component;
};

export default PlayerCover;
