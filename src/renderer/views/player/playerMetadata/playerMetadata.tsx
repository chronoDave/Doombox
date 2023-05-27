import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import Icon from '../../../components/icon/icon';
import { playerSongSelector } from '../../../state/selectors/player.selectors';
import { queueIndexSelector, queueSelector } from '../../../state/selectors/queue.selectors';

import './playerMetadata.scss';

export type PlayerMetadataProps = {};

const PlayerMetadata: Component<PlayerMetadataProps> = () => {
  const component = new forgo.Component<PlayerMetadataProps>({
    render() {
      const current = playerSongSelector.get();
      const queue = queueSelector.get();
      const queueIndex = queueIndexSelector.get();

      return (
        <div class='PlayerMetadata'>
          <span class='title'>{current?.title ?? 'unknown'}</span>
          <span class='artist'>{current?.artist ?? 'unknown'}</span>
          <span class='album'>{current?.album ?? 'unknown'}</span>
          {queue.length > 0 ? (
            <span class='queue'>
              <Icon id='playlistMusic' />
              {queueIndex + 1} / {queue.length}
            </span>
          ) : null}
        </div>
      );
    }
  });

  playerSongSelector.subscribe(component);
  queueSelector.subscribe(component);
  queueIndexSelector.subscribe(component);

  return component;
};

export default PlayerMetadata;
