import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import { Thumb } from '../../../types/library';
import { thumbSelector } from '../../state/selectors/app.selectors';
import { playerSongSelector } from '../../state/selectors/player.selectors';
import { themePlayerSelector } from '../../state/selectors/theme.selectors';
import cx from '../../utils/cx/cx';

import './playerCover.scss';

export type PlayerCoverProps = {};

const PlayerCover: Component<PlayerCoverProps> = () => {
  const component = new forgo.Component<PlayerCoverProps>({
    render() {
      const themePlayer = themePlayerSelector.get();
      const current = playerSongSelector.get();

      const src = thumbSelector.get(Thumb.Player, current?.image);

      return (
        <div class='PlayerCover'>
          {themePlayer.cover === 'contain' ? (
            <img
              src={src}
              loading='lazy'
              alt=''
              class='bg'
            />
          ) : null}
          <img
            src={src}
            loading='lazy'
            alt=''
            class={cx(themePlayer.cover === 'contain' && 'contain')}
          />
        </div>
      );
    }
  });

  thumbSelector.subscribe(component);
  playerSongSelector.subscribe(component);
  themePlayerSelector.subscribe(component);

  return component;
};

export default PlayerCover;
