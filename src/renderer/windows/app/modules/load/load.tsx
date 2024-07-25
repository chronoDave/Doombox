import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import Loader from '@doombox/components/loader/loader';

import './load.scss';

export type LoadViewProps = {};

const LoadView: Component<LoadViewProps> = () => {
  const component = new forgo.Component<LoadViewProps>({
    render() {
      return (
        <main class="load">
          <Loader bars={12} />
          <p>Loading...</p>
        </main>
      );
    }
  });

  return component;
};

export default LoadView;
