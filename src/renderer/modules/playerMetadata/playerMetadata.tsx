import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import { playerSongSelector } from '../../state/selectors/player.selectors';

import './playerMetadata.scss';

export type PlayerMetadataProps = {};

const PlayerMetadata: Component<PlayerMetadataProps> = () => {
  const component = new forgo.Component<PlayerMetadataProps>({
    render() {
      const current = playerSongSelector.get();

      return (
        <div class='PlayerMetadata'>
          <p class='title nowrap'>{current?.title ?? 'unknown'}</p>
          <p class='artist nowrap'>{current?.artist ?? 'unknown'}</p>
          <p class='album nowrap'>{current?.album ?? 'unknown'}</p>
        </div>
      );
    }
  });

  playerSongSelector.subscribe(component);

  return component;
};

export default PlayerMetadata;
