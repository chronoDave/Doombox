import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import './inputCheckbox.scss';

export type InputCheckboxProps = {
  id: string
  label: string
  value: string | number
  checked: boolean
};

const InputCheckbox: Component<InputCheckboxProps> = () => {
  const component = new forgo.Component<InputCheckboxProps>({
    render(props) {
      return (
        <label class='InputCheckbox'>
          <input
            type='checkbox'
            name={props.id}
            value={props.value}
            checked={props.checked}
            aria-checked={props.checked}
          />
          {props.label}
        </label>
      );
    }
  });

  return component;
};

export default InputCheckbox;
