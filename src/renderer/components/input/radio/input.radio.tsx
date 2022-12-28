import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import './input.radio.scss';

export type InputRadioOption = {
  id: string
  label: string
  value: string
};

export type InputRadioProps = {
  id: string
  label: string
  value: string
  onchange: (value: string, event: Event) => void
  options: InputRadioOption[]
};

const InputRadio: Component<InputRadioProps> = () => {
  const component = new forgo.Component<InputRadioProps>({
    render(props) {
      return (
        <fieldset
          id={props.id}
          class="InputRadio"
          role="presentation"
          name={props.id}
          onchange={e => {
            const { value } = e.target as HTMLInputElement;
            if (value) props.onchange(value, e);
          }}
        >
          <legend>{props.label}</legend>
          {props.options.map(option => (
            <label key={option.id}>
              <input
                type="radio"
                name={props.id}
                value={option.value}
                checked={option.value === props.value}
              />
              {option.label}
            </label>
          ))}
        </fieldset>
      );
    }
  });

  return component;
};

export default InputRadio;
