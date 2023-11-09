import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import subscribe from './playerCover.state';

export type PlayerCoverProps = {};

const PlayerCover: Component<PlayerCoverProps> = () => {
  const component = new forgo.Component<PlayerCoverProps>({
    render() {
      const src = subscribe(component);

      return <img src={src} alt='' class='bg' />;
    }
  });

  return component;
};

export default PlayerCover;
