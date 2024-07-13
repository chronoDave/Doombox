import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import Icon from '../icon/icon';

import './input-search.scss';

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
        <div class='input-search' role='search'>
          <input
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
          {ref.value?.value && (
            <button
              class='button'
              type='button'
              onclick={() => {
                ref.value!.value = '';
                props.onsubmit(ref.value!.value);
              }}
            >
              <Icon id='close' />
            </button>
          )}
        </div>
      );
    }
  });

  return component;
};

export default InputSearch;
