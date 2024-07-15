import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import './input-checkbox.scss';

export type InputCheckboxProps = {
  id: string
  label: string
  checked: boolean
  onchange: (checked: boolean, event: forgo.JSX.TargetedEvent<HTMLInputElement, Event>) => void
};

const InputCheckbox: Component<InputCheckboxProps> = () => {
  const component = new forgo.Component<InputCheckboxProps>({
    render(props) {
      return (
        <div class='form-group input-checkbox'>
          <div class='checkbox'>
            <input
              id={props.id} type='checkbox'
              checked={props.checked}
              onchange={event => props.onchange(event.currentTarget.checked, event)}
            />
            <label for={props.id}>{props.label}</label>
          </div>
          {props.children && (
            <div class='description'>
              {props.children}
            </div>
          )}
        </div>
      );
    }
  });

  return component;
};

export default InputCheckbox;
