import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

export type AlbumViewProps = {};

const AlbumView: Component<AlbumViewProps> = () => {
  const component = new forgo.Component<AlbumViewProps>({
    render() {
      return (
        <div class="view">AlbumView</div>
      );
    }
  });

  return component;
};

export default AlbumView;
