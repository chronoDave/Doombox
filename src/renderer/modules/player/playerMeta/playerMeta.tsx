import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import subscribe from './playerMeta.state';

export type PlayerMetaProps = {};

const PlayerMeta: Component<PlayerMetaProps> = () => {
  const component = new forgo.Component<PlayerMetaProps>({
    render() {
      const current = subscribe(component);

      if (!current?.title || !current.artist) {
        return (
          <div class='PlayerMeta'>
            <p class="muted">No song(s) selected</p>
          </div>
        );
      }

      return (
        <dl class='PlayerMeta'>
          <dt class='sr-only'>title</dt>
          <dd class='nowrap'>{current.title ?? 'unknown'}</dd>
          <dt class='sr-only'>Artist</dt>
          <dd class='nowrap'>{current.artist ?? 'unknown'}</dd>
        </dl>
      );
    }
  });

  return component;
};

export default PlayerMeta;
