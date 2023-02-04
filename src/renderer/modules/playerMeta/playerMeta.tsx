import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import { getCurrent } from '../../state/selectors/player.selectors';
import store from '../../state/store';

import './playerMeta.scss';

export type PlayerMetaProps = {};

const PlayerMeta: Component<PlayerMetaProps> = () => {
  const component = new forgo.Component<PlayerMetaProps>({
    render() {
      const current = getCurrent();

      return (
        <div class='PlayerMeta'>
          <span class='scroll title'>{current?.title ?? 'unknown'}</span>
          <span class='scroll artist'>{current?.artist ?? 'unknown'}</span>
          <span class='scroll label'>{current?.label ?? 'unknown'}</span>
        </div>
      );
    }
  });

  return store.subscribe(component, (prev, cur) => (
    prev.player.current?.id !== cur.player.current?.id
  ));
};

export default PlayerMeta;
