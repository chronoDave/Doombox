import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import { Thumb } from '../../../types/library';
import ImageBlur from '../../components/imageBlur/imageBlur';
import { thumbSelector } from '../../state/selectors/app.selectors';
import { playerSongSelector } from '../../state/selectors/player.selectors';
import { themePlayerSelector } from '../../state/selectors/theme.selectors';

import './playerCover.scss';

export type PlayerCoverProps = {};

const PlayerCover: Component<PlayerCoverProps> = () => {
  const component = new forgo.Component<PlayerCoverProps>({
    render() {
      const themePlayer = themePlayerSelector.get();
      const current = playerSongSelector.get();

      return (
        <div class='PlayerCover'>
          {(
            themePlayer.cover === 'contain' &&
            current?.image
          ) ? <ImageBlur src={thumbSelector.get(current.image, Thumb.Player)} alt='' padding={16} /> : null}
          {(
            themePlayer.cover === 'cover' &&
            current?.image
          ) ? <img src={current.image} alt='' /> : null}
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
