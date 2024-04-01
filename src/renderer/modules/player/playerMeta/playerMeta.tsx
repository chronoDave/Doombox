import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import subscribe from './playerMeta.state';

import './playerMeta.scss';

export type PlayerMetaProps = {};

const PlayerMeta: Component<PlayerMetaProps> = () => {
  const component = new forgo.Component<PlayerMetaProps>({
    render() {
      const current = subscribe(component);

      if (!current?.title || !current.artist) {
        return (
          <div class='PlayerMeta center'>
            <p class="muted">No song(s) selected</p>
          </div>
        );
      }

      return (
        <dl class='PlayerMeta center'>
          <dt class='sr-only'>Title</dt>
          <dd class='nowrap'>{current.title ?? 'Unknown'}</dd>
          <dt class='sr-only'>Artist</dt>
          <dd class='nowrap small'>{current.artist ?? 'Unknown'}</dd>
          <dt class='sr-only'>Album</dt>
          <dd class='nowrap small'>{current.album ?? 'Unknown'}</dd>
        </dl>
      );
    }
  });

  return component;
};

export default PlayerMeta;
