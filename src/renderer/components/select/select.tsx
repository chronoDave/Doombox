import type { Component } from 'forgo';

import * as forgo from 'forgo';

export type SelectOption<T extends string = string> = {
  value: T
  label: string
};

export type SelectProps<T extends SelectOption> = {
  id: string
  label: string
  options: T[]
  value: string
  onchange: (value: T['value'], event: Event) => void
};

const Select = <T extends SelectOption>(
  initial: SelectProps<T>
): Component<SelectProps<T>> => {
  const component = new forgo.Component<SelectProps<T>>({
    render(props) {
      return (
        <div class='form-group'>
          <label for={props.id}>{props.label}</label>
          <select
            id={props.id}
            name={props.id}
            onchange={event => props.onchange((event.target as HTMLSelectElement).value, event)}
          >
            {props.options.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      );
    }
  });

  return component;
};

export default Select;
