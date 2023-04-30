import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import { playerSongSelector } from '../../state/selectors/player.selectors';

import './playerMeta.scss';

export type PlayerMetaProps = {};

const PlayerMeta: Component<PlayerMetaProps> = () => {
  const component = new forgo.Component<PlayerMetaProps>({
    render() {
      const current = playerSongSelector.get();

      return (
        <div class='PlayerMeta'>
          <span class='scroll title'>{current?.title ?? 'unknown'}</span>
          <span class='scroll artist'>{current?.artist ?? 'unknown'}</span>
          <span class='scroll label'>{current?.label ?? 'unknown'}</span>
        </div>
      );
    }
  });

  return playerSongSelector.subscribe(component);
};

export default PlayerMeta;
