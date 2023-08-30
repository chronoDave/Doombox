import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import './label.scss';

export type LabelProps = {
  title: string
  description?: string
};

const Label: Component<LabelProps> = () => {
  const component = new forgo.Component<LabelProps>({
    render(props) {
      return (
        <label class='Label'>
          <div class='label'>
            <span>{props.title}</span>
            {props.description && <span>{props.description}</span>}
          </div>
          {props.children}
        </label>
      );
    }
  });

  return component;
};

export default Label;
