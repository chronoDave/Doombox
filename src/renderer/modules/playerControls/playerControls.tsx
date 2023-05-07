import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import Icon from '../../components/icon/icon';
import { AudioStatus } from '../../lib/audio';
import { previous, pause, next } from '../../state/actions/player.actions';
import { playerStatusSelector } from '../../state/selectors/player.selectors';
import PlayerVolume from '../playerVolume/playerVolume';

import './playerControls.scss';

export type PlayerControlsProps = {};

const PlayerControls: Component<PlayerControlsProps> = () => {
  const component = new forgo.Component<PlayerControlsProps>({
    render() {
      const playerStatus = playerStatusSelector.get();

      return (
        <div class='PlayerControls'>
          <PlayerVolume />
          <button type='button' onclick={() => previous()}>
            <Icon id='previous' />
          </button>
          <button type='button' onclick={() => pause()}>
            <Icon id={playerStatus === AudioStatus.Playing ? 'pause' : 'play'} />
          </button>
          <button type='button' onclick={() => next()}>
            <Icon id='next' />
          </button>
        </div>
      );
    }
  });

  return playerStatusSelector.subscribe(component);
};

export default PlayerControls;
