import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import { playerSongSelector } from '../../state/selectors/player.selectors';

export type PlayerMetadataProps = {};

const PlayerMetadata: Component<PlayerMetadataProps> = () => {
  const component = new forgo.Component<PlayerMetadataProps>({
    render() {
      const current = playerSongSelector.get();

      return (
        <div class='PlayerMetadata'>
          <p class='nowrap'>{current?.title ?? 'unknown'}</p>
          <p class='small nowrap'>{current?.artist ?? 'unknown'}</p>
        </div>
      );
    }
  });

  playerSongSelector.subscribe(component);

  return component;
};

export default PlayerMetadata;
