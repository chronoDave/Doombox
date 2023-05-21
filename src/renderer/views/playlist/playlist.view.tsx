import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

export type PlaylistViewProps = {};

const PlaylistView: Component<PlaylistViewProps> = () => {
  const component = new forgo.Component<PlaylistViewProps>({
    render() {
      return (
        <div class="View">PlaylistView</div>
      );
    }
  });

  return component;
};

export default PlaylistView;
