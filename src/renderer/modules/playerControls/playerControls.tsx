import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import Icon from '../../components/icon/icon';
import { AudioStatus } from '../../lib/audio';
import { pause } from '../../state/actions/player.actions';
import store from '../../state/store';
import createSubscription from '../../utils/subscribe';
import PlayerVolume from '../playerVolume/playerVolume';

import './playerControls.scss';

export type PlayerControlsProps = {};

const PlayerControls: Component<PlayerControlsProps> = () => {
  const subscribe = createSubscription(store);
  const component = new forgo.Component<PlayerControlsProps>({
    render() {
      const { player } = store.get();

      return (
        <div class='PlayerControls'>
          <PlayerVolume />
          <button type='button'>
            <Icon id='previous' />
          </button>
          <button type='button' onclick={pause}>
            <Icon id={player.status === AudioStatus.Playing ? 'pause' : 'play'} />
          </button>
          <button type='button'>
            <Icon id='next' />
          </button>
        </div>
      );
    }
  });

  return subscribe((prev, cur) => (
    prev.player.status !== cur.player.status
  ))(component);
};

export default PlayerControls;
