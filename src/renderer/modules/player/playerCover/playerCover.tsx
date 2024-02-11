import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import subscribe from './playerCover.state';

export type PlayerCoverProps = {};

const PlayerCover: Component<PlayerCoverProps> = () => {
  const component = new forgo.Component<PlayerCoverProps>({
    render() {
      const src = subscribe(component);

      return (
        <picture class='bg'>
          <source
            srcset={src.lg}
            media="(min-width: 960px) and (min-height: 720px)"
            width={384}
            height={384}
          />
          <source
            srcset={src.md}
            media="(min-width: 720px) and (min-height: 480px)"
            width={256}
            height={256}
          />
          <img
            src={src.xs}
            alt=''
            class='bg'
            width={192}
            height={192}
          />
        </picture>
      );
    }
  });

  return component;
};

export default PlayerCover;
