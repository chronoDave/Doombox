import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import { Thumb } from '../../../types/library';
import { thumbSelector } from '../../state/selectors/app.selectors';
import { playerSongSelector } from '../../state/selectors/player.selectors';

import './playerCover.scss';

export type PlayerCoverProps = {};

const PlayerCover: Component<PlayerCoverProps> = () => {
  const component = new forgo.Component<PlayerCoverProps>({
    render() {
      const current = playerSongSelector.get();

      const src = thumbSelector.get(Thumb.Player, current?.image);

      return (
        <div class='PlayerCover'>
          <img
            src={src}
            loading='lazy'
            alt=''
            class='bg'
          />
          <img
            src={src}
            loading='lazy'
            alt=''
            class='contain'
          />
        </div>
      );
    }
  });

  thumbSelector.subscribe(component);
  playerSongSelector.subscribe(component);

  return component;
};

export default PlayerCover;
