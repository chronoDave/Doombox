import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import { playAlbum } from '../../../state/actions/queue.actions';
import { searchAlbum } from '../../../state/actions/search.actions';

import subscribe from './playerMeta.state';

import './playerMeta.scss';

export type PlayerMetaProps = {};

const PlayerMeta: Component<PlayerMetaProps> = () => {
  const component = new forgo.Component<PlayerMetaProps>({
    render() {
      const current = subscribe(component);

      if (!current?.title || !current.artist) {
        return (
          <div class='PlayerMeta'>
            <p>No song(s) selected</p>
          </div>
        );
      }

      return (
        <dl class='PlayerMeta'>
          <dt class='sr-only'>Title</dt>
          <dd class='nowrap'>{current.title ?? 'Unknown'}</dd>
          <dt class='sr-only'>Artist</dt>
          <dd class='nowrap'>{current.artist ?? 'Unknown'}</dd>
          <dt class='sr-only'>Album</dt>
          <dd class='nowrap'>
            <button
              type='button'
              aria-label={`Play ${current.album}`}
              disabled={!current.album}
              onclick={async () => {
                const album = await searchAlbum(current._id);
                playAlbum(album._id);
              }}
            >
              {current.album ?? 'Unknown'}
            </button>
          </dd>
        </dl>
      );
    }
  });

  return component;
};

export default PlayerMeta;
