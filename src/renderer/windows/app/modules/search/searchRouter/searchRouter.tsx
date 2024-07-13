import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import * as Route from '../../../state/route';
import SearchAlbum from '../searchAlbum/searchAlbum';
import SearchLabel from '../searchLabel/searchLabel';
import SearchSong from '../searchSong/searchSong';

import subscribe from './searchRouter.state';

export type SearchRouterProps = {};

const SearchRouter: Component<SearchRouterProps> = () => {
  const views: Record<Route.Search, forgo.Component> = {
    [Route.Search.Song]: <SearchSong />,
    [Route.Search.Album]: <SearchAlbum />,
    [Route.Search.Label]: <SearchLabel />
  };

  const component = new forgo.Component<SearchRouterProps>({
    render() {
      const view = subscribe('SearchRouter', component);

      return views[view];
    }
  });

  return component;
};

export default SearchRouter;
