import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import './inputSearch.scss';

export type InputSearchProps = {
  placeholder?: string
  onsubmit: (query: string) => void
  oninput?: (query: string) => void
};

const InputSearch: Component<InputSearchProps> = () => {
  const ref: forgo.ForgoRef<HTMLInputElement> = {};
  const component = new forgo.Component<InputSearchProps>({
    render(props) {
      return (
        <input
          class='InputSearch'
          ref={ref}
          type='search'
          placeholder={props.placeholder ?? 'Search...'}
          onkeyup={event => {
            if (event.key === 'Enter') {
              props.onsubmit(ref.value?.value ?? '');
            } else {
              props.oninput?.(ref.value?.value ?? '');
            }
          }}
          onsubmit={() => props.onsubmit(ref.value?.value ?? '')}
        />
      );
    }
  });

  return component;
};

export default InputSearch;
