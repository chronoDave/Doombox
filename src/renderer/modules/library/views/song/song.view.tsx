import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

export type SongViewProps = {};

const SongView: Component<SongViewProps> = () => {
  const component = new forgo.Component<SongViewProps>({
    render() {
      return (
        <div class="view">SongView</div>
      );
    }
  });

  return component;
};

export default SongView;
