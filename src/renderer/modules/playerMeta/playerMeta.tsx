import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import { getCurrent } from '../../selectors/player.selectors';
import store from '../../state/store';
import createSubscription from '../../utils/subscribe';

import './playerMeta.scss';

export type PlayerMetaProps = {};

const PlayerMeta: Component<PlayerMetaProps> = () => {
  const subscribe = createSubscription(store);
  const component = new forgo.Component<PlayerMetaProps>({
    render() {
      const current = getCurrent(store)();

      return (
        <div class='PlayerMeta'>
          <span class='scroll title'>{current?.title ?? 'unknown'}</span>
          <span class='scroll artist'>{current?.artist ?? 'unknown'}</span>
          <span class='scroll label'>{current?.label ?? 'unknown'}</span>
        </div>
      );
    }
  });

  return subscribe((prev, cur) => (
    prev.player.current?.id !== cur.player.current?.id
  ))(component);
};

export default PlayerMeta;
