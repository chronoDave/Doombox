import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

export type PlayerViewProps = {};

const PlayerView: Component<PlayerViewProps> = () => {
  const component = new forgo.Component<PlayerViewProps>({
    render() {
      return (
        <div>PlayerView</div>
      );
    }
  });

  return component;
};

export default PlayerView;
