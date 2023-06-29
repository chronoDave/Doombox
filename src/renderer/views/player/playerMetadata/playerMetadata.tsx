import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import { playerSongSelector } from '../../../state/selectors/player.selectors';

export type PlayerMetadataProps = {};

const PlayerMetadata: Component<PlayerMetadataProps> = () => {
  const component = new forgo.Component<PlayerMetadataProps>({
    render() {
      const current = playerSongSelector.get();

      return (
        <div class='PlayerMetadata'>
          <span class='title'>{current?.title ?? 'unknown'}</span>
          <span class='artist'>{current?.artist ?? 'unknown'}</span>
          <span class='album'>{current?.album ?? 'unknown'}</span>
        </div>
      );
    }
  });

  playerSongSelector.subscribe(component);

  return component;
};

export default PlayerMetadata;
