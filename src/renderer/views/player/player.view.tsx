import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import Icon from '../../components/icon/icon';
import { PlayerStatus } from '../../lib/player';
import PlayerControls from '../../modules/playerControls/playerControls';
import PlayerSlider from '../../modules/playerSlider/playerSlider';
import { getCurrent } from '../../state/selectors/player.selectors';
import store from '../../state/store';

import './player.view.scss';

export type PlayerViewProps = {};

const PlayerView: Component<PlayerViewProps> = () => {
  const component = new forgo.Component<PlayerViewProps>({
    render() {
      const current = getCurrent();

      return (
        <div class='Player'>
          <div class='current'>
            {current?.image && [
              <img
                class='cover blur'
                src={current.image}
                alt=''
              />,
              <img
                class='cover'
                src={current.image}
                alt=''
              />
            ]}
            <div class='meta'>
              <span class='title'>{current?.title ?? 'unknown'}</span>
              <span class='artist'>{current?.artist ?? 'unknown'}</span>
              <span class='label'>{current?.label ?? 'unknown'}</span>
            </div>
          </div>
          <PlayerSlider />
          <PlayerControls />
        </div>
      );
    }
  });

  return store.subscribe(component, (prev, cur) => (
    prev.player.current?.id !== cur.player.current?.id
  ));
};

export default PlayerView;
