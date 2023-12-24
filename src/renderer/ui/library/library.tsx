import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import { search } from '../../actions/library.actions';
import GridLabel from '../../components/gridLabel/gridLabel';
import InputSearch from '../../components/inputSearch/inputSearch';

import subscribe from './library.state';

import './library.scss';

export type LibraryProps = {};

const Library: Component<LibraryProps> = () => {
  const component = new forgo.Component<LibraryProps>({
    render() {
      const state = subscribe(component);

      return (
        <div class='Library'>
          <div class='bar'>
            <InputSearch
              placeholder='Search...'
              onsubmit={search}
            />
          </div>
          <GridLabel labels={state.labels} current={state.current} />
        </div>
      );
    }
  });

  return component;
};

export default Library;
