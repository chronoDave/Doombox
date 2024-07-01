import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import Icon from '@doombox/components/icon/icon';

import { AudioStatus } from '../../../../../lib/audio/audio';
import { next, pause, previous } from '../../../actions/player.actions';
import { shuffleQueue } from '../../../actions/queue.actions';
import PlayerVolume from '../playerVolume/playerVolume';

import subscribe from './playerControls.state';

import './playerControls.scss';

export type PlayerControlsProps = {};

const PlayerControls: Component<PlayerControlsProps> = () => {
  const component = new forgo.Component<PlayerControlsProps>({
    render() {
      const playerStatus = subscribe('PlayerControls', component);

      return (
        <div class='PlayerControls'>
          <PlayerVolume />
          <button
            class='button'
            type='button'
            onclick={previous}
          >
            <Icon id='skip-previous' />
          </button>
          <button
            class='button'
            type='button'
            onclick={pause}
          >
            <Icon id={playerStatus === AudioStatus.Playing ? 'pause' : 'play'} />
          </button>
          <button
            class='button'
            type='button'
            onclick={next}
          >
            <Icon id='skip-next' />
          </button>
          <button
            class='button'
            type='button'
            onclick={shuffleQueue}
          >
            <Icon id='shuffle' />
          </button>
        </div>
      );
    }
  });

  return component;
};

export default PlayerControls;
