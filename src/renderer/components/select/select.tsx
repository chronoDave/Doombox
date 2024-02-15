import type { Component } from 'forgo';

import * as forgo from 'forgo';

export type SelectOption = {
  value: string
  label: string
};

export type SelectProps<T extends SelectOption> = {
  id: string
  options: T[]
  value: string
  onChange: (value: string, event: Event) => void
};

const Select = <T extends SelectOption>(
  initial: SelectProps<T>
): Component<SelectProps<T>> => {
  const component = new forgo.Component<SelectProps<T>>({
    render(props) {
      return (
        <select
          name={props.id}
          onchange={event => props.onChange((event.target as HTMLSelectElement).value, event)}
        >
          {props.options.map(option => (
            <option
              key={option.value}
              value={option.value}
              selected={props.value === option.value}
            >
              {option.label}
            </option>
          ))}
        </select>
      );
    }
  });

  return component;
};

export default Select;
