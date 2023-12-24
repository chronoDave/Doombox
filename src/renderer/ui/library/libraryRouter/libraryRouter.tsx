import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import GridLabel from '../../../components/gridLabel/gridLabel';
import ListAlbum from '../../../components/listAlbum/listAlbum';
import ListLabel from '../../../components/listLabel/listLabel';
import ListSong from '../../../components/listSong/listSong';
import * as Route from '../../../types/route';

import subscribe from './libraryRouter.state';

export type LibraryRouterProps = {};

const LibraryRouter: Component<LibraryRouterProps> = () => {
  const component = new forgo.Component<LibraryRouterProps>({
    render() {
      const state = subscribe(component);

      if (state.search.query) {
        if (state.route === Route.Search.Label) return <ListLabel labels={state.search.labels} />;
        if (state.route === Route.Search.Album) return <ListAlbum albums={state.search.albums} />;
        if (state.route === Route.Search.Song) return <ListSong songs={state.search.songs} />;
      }
      return <GridLabel labels={state.labels} current={state.current} />;
    }
  });

  return component;
};

export default LibraryRouter;
