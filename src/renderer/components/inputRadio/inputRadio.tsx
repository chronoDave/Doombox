import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

export type InputRadioProps = {
  id: string
  label: string
  value: string | number
  checked: boolean
};

const InputRadio: Component<InputRadioProps> = () => {
  const component = new forgo.Component<InputRadioProps>({
    render(props) {
      return (
        <label class='InputRadio'>
          <input
            type='radio'
            name={props.id}
            value={props.value}
            checked={props.checked}
          />
          {props.label}
        </label>
      );
    }
  });

  return component;
};

export default InputRadio;
