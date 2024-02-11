import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import SearchNav from './searchNav/searchNav';
import SearchRouter from './searchRouter/searchRouter';

export type SearchProps = {};

const Search: Component<SearchProps> = () => {
  const component = new forgo.Component<SearchProps>({
    render() {
      return [
        <SearchNav />,
        <SearchRouter />
      ];
    }
  });

  return component;
};

export default Search;
