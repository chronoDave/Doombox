import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import subscribe from './playerCover.state';

import './playerCover.scss';

export type PlayerCoverProps = {};

const PlayerCover: Component<PlayerCoverProps> = () => {
  const component = new forgo.Component<PlayerCoverProps>({
    render() {
      const src = subscribe('PlayerCover', component);

      return (
        <picture class='PlayerCover'>
          <source
            srcset={src.lg}
            media="(min-width: 960px) and (min-height: 720px)"
            width={256}
            height={256}
          />
          <source
            srcset={src.md}
            media="(min-width: 720px) and (min-height: 480px)"
            width={224}
            height={224}
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
