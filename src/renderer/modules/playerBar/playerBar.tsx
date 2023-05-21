import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import { Thumb } from '../../../types/library';
import { thumbSelector } from '../../state/selectors/app.selectors';
import { playerSongSelector } from '../../state/selectors/player.selectors';
import cx from '../../utils/cx/cx';
import PlayerControls from '../playerControls/playerControls';
import PlayerSlider from '../playerSlider/playerSlider';

import './playerBar.scss';

export type PlayerBarProps = {};

const PlayerBar: Component<PlayerBarProps> = () => {
  const component = new forgo.Component<PlayerBarProps>({
    render() {
      const current = playerSongSelector.get();

      return (
        <div class="PlayerBar">
          <img
            src={thumbSelector.get(current?.image ?? null, Thumb.Player)}
            alt=''
            height={32}
          />
          <p class={cx('meta', !current && 'hidden')}>
            <span class="title">{current?.artist} - {current?.title}</span>
            <span class="subtitle">{current?.album}</span>
          </p>
          <PlayerSlider />
          <PlayerControls />
        </div>
      );
    }
  });

  playerSongSelector.subscribe(component);
  thumbSelector.subscribe(component);

  return component;
};

export default PlayerBar;
