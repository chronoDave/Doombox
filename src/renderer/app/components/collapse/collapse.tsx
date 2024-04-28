import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import Icon from '../icon/icon';

import './collapse.scss';

export type CollapseProps = {
  id: string
  title: forgo.Component
};

const Collapse: Component<CollapseProps> = () => {
  let expanded = false;

  const component = new forgo.Component<CollapseProps>({
    render(props) {
      return (
        <div class='Collapse'>
          <button
            type='button'
            class='button'
            aria-expanded={expanded}
            aria-controls={props.id}
            onclick={() => {
              expanded = !expanded;
              component.update();
            } }
          >
            {props.title}
            <Icon id={expanded ? 'chevron-up' : 'chevron-down'} />
          </button>
          <div id={props.id} class='body'>
            {props.children}
          </div>
        </div>
      );
    }
  });

  return component;
};

export default Collapse;
