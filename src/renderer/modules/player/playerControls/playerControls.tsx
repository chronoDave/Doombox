import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import { next, pause, previous } from '../../../actions/player.actions';
import { shuffleQueue } from '../../../actions/queue.actions';
import Icon from '../../../components/icon/icon';
import { AudioStatus } from '../../../lib/audio';
import PlayerVolume from '../playerVolume/playerVolume';

import subscribe from './playerControls.state';

import './playerControls.scss';

export type PlayerControlsProps = {};

const PlayerControls: Component<PlayerControlsProps> = () => {
  const component = new forgo.Component<PlayerControlsProps>({
    render() {
      const playerStatus = subscribe(component);

      return (
        <div class='PlayerControls'>
          <PlayerVolume />
          <button type='button' onclick={previous}>
            <Icon id='previous' />
          </button>
          <button type='button' onclick={pause}>
            <Icon id={playerStatus === AudioStatus.Playing ? 'pause' : 'play'} />
          </button>
          <button type='button' onclick={next}>
            <Icon id='next' />
          </button>
          <button type='button' onclick={shuffleQueue}>
            <Icon id='shuffle' />
          </button>
        </div>
      );
    }
  });

  return component;
};

export default PlayerControls;
