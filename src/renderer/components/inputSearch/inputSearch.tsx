import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import Icon from '../icon/icon';

import './inputSearch.scss';

export type InputSearchProps = {
  placeholder: string
  onsubmit: (query: string) => void
};

const InputSearch: Component<InputSearchProps> = () => {
  const ref: forgo.ForgoRef<HTMLInputElement> = {};
  const component = new forgo.Component<InputSearchProps>({
    render(props) {
      return (
        <div class='InputSearch'>
          <button
            type='button'
            aria-label='search'
            onclick={() => ref.value && props.onsubmit(ref.value.value)}
          >
            <Icon id='search' />
          </button>
          <input
            ref={ref}
            type='search'
            placeholder={props.placeholder}
            onkeydown={e => {
              if (e.key === 'Enter' && ref.value) {
                e.preventDefault();
                props.onsubmit(ref.value.value);
              }
            }}
          />
          <button
            type='button'
            aria-label='clear search'
            onclick={() => {
              if (ref.value) {
                ref.value.value = '';
                props.onsubmit(ref.value.value);
              }
            }}
          >
            <Icon id='close' />
          </button>
        </div>
      );
    }
  });

  return component;
};

export default InputSearch;
