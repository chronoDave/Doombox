import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import ImageBlur from '../../components/imageBlur/imageBlur';
import { getCurrent } from '../../state/selectors/player.selectors';
import store from '../../state/store';

import './playerCover.scss';

export type PlayerCoverProps = {};

const PlayerCover: Component<PlayerCoverProps> = () => {
  const component = new forgo.Component<PlayerCoverProps>({
    render() {
      const { theme } = store.get();
      const current = getCurrent();

      return (
        <div class='PlayerCover'>
          {(
            theme.player.cover === 'contain' &&
            current?.image
          ) ? <ImageBlur src={current.image} alt='' padding={16} /> : null}
          {(
            theme.player.cover === 'cover' &&
            current?.image
          ) ? <img src={current.image} alt='' /> : null}
        </div>
      );
    }
  });

  return store.subscribe(component, (prev, cur) => (
    prev.player.current?.id !== cur.player.current?.id ||
    prev.theme.player.cover !== cur.theme.player.cover
  ));
};

export default PlayerCover;
