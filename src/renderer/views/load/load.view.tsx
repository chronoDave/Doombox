import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import Loader from '../../components/loader/loader';
import useMediaQuery from '../../hooks/useMediaQuery';
import createMediaQuery from '../../utils/mediaQuery';

import './load.view.scss';

export type LoadViewProps = {};

const LoadView: Component<LoadViewProps> = () => {
  let bars = 12;

  const component = new forgo.Component<LoadViewProps>({
    render() {
      return (
        <div class="View LoadView">
          <Loader bars={bars} />
          <h1 class="title">Loading...</h1>
        </div>
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
