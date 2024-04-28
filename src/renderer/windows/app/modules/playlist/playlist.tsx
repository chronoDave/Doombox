import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

export type PlaylistProps = {};

const Playlist: Component<PlaylistProps> = () => {
  const component = new forgo.Component<PlaylistProps>({
    render() {
      return (
        <div>Playlist</div>
      );
    }
  });

  return component;
};

export default Playlist;
