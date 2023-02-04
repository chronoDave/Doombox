import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import Icon from '../../components/icon/icon';
import { PlayerStatus } from '../../lib/player';
import { pause } from '../../state/actions/player.actions';
import store from '../../state/store';

import './playerControls.scss';

export type PlayerControlsProps = {};

const PlayerControls: Component<PlayerControlsProps> = () => {
  const component = new forgo.Component<PlayerControlsProps>({
    render() {
      const { player } = store.get();

      return (
        <div class='PlayerControls'>
          <button type='button'>
            <Icon id='previous' />
          </button>
          <button type='button' onclick={pause}>
            <Icon id={player.status === PlayerStatus.Playing ? 'pause' : 'play'} />
          </button>
          <button type='button'>
            <Icon id='next' />
          </button>
        </div>
      );
    }
  });

  return store.subscribe(component, (prev, cur) => (
    prev.player.status !== cur.player.status
  ));
};

export default PlayerControls;
