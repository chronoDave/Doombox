import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

export type LibraryPlayerProps = {};

const LibraryPlayer: Component<LibraryPlayerProps> = () => {
  const component = new forgo.Component<LibraryPlayerProps>({
    render() {
      return (
        <div class="view">LibraryPlayer</div>
      );
    }
  });

  return component;
};

export default LibraryPlayer;
