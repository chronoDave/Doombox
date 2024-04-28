import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import Loader from '../../../components/loader/loader';
import createMediaQuery from '../../../lib/css/mediaQuery';
import useMediaQuery from '../../hooks/useMediaQuery';

import './load.scss';

export type LoadViewProps = {};

const LoadView: Component<LoadViewProps> = () => {
  let bars = 12;

  const component = new forgo.Component<LoadViewProps>({
    render() {
      return (
        <main class="Load">
          <Loader bars={bars} />
          <h1 class="title h4">Loading...</h1>
        </main>
      );
    }
  });

  return useMediaQuery([
    createMediaQuery({ axis: 'min-width', breakpoint: 'xs-w' }),
    createMediaQuery({ axis: 'min-width', breakpoint: 'sm-w' }),
    createMediaQuery({ axis: 'min-width', breakpoint: 'md-w' }),
    createMediaQuery({ axis: 'min-width', breakpoint: 'lg-w' }),
    createMediaQuery({ axis: 'min-width', breakpoint: 'xl-w' })
  ])(i => {
    bars = 12 + (i * 6);
  })(component);
};

export default LoadView;
