import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import svg from './svg';
import './icon.scss';

export type IconProps = {
  id: keyof typeof svg
};

const Icon: Component<IconProps> = () => new forgo.Component({
  render(props) {
    return (
      <svg
        focusable="false"
        aria-hidden="true"
        viewBox="0 0 24 24"
        class='Icon'
      >
        <path d={svg[props.id]} />
      </svg>
    );
  }
});

export default Icon;
