import type { InputRadioProps } from '../inputRadio/inputRadio';
import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import InputRadio from '../inputRadio/inputRadio';

export type InputRadioListProps = {
  id: string
  label: string
  value: string
  onchange: (value: string, event: Event) => void
  options: Array<Omit<InputRadioProps, 'checked'>>
};

const InputRadioList: Component<InputRadioListProps> = () => {
  const component = new forgo.Component<InputRadioListProps>({
    render(props) {
      return (
        <fieldset
          id={props.id}
          class="InputRadioList"
          name={props.id}
        >
          <legend>{props.label}</legend>
          <div
            class='options'
            role="presentation"
            onchange={e => {
              const { value } = e.target as HTMLInputElement;
              if (value) props.onchange(value, e);
            }}
          >
            {props.options.map(option => (
              <InputRadio
                id={option.id}
                label={option.label}
                value={option.value}
                checked={option.value === props.value}
              />
            ))}
          </div>
        </fieldset>
      );
    }
  });

  return component;
};

export default InputRadioList;
