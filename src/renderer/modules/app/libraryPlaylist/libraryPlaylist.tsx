import type { Playlist } from '../../../../types/playlist';
import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import PlaylistDetail from '../../../views/playlistDetail/playlistDetail';
import PlaylistOverview from '../../../views/playlistOverview/playlistOverview';

import subscribe from './libraryPlaylist.state';

export type LibraryPlaylistProps = {};

const LibraryPlaylist: Component<LibraryPlaylistProps> = () => {
  let playlist: Playlist | null = null;

  const component = new forgo.Component<LibraryPlaylistProps>({
    render() {
      const { playlists, songs, current } = subscribe(component);

      if (playlist) {
        return (
          <PlaylistDetail
            current={current}
            songs={songs}
            playlist={playlist}
            oncancel={() => { playlist = null; component.update(); }}
          />
        );
      }
      return (
        <PlaylistOverview
          playlists={playlists}
          onclick={x => { playlist = x; component.update(); }}
        />
      );
    }
  });

  return component;
};

export default LibraryPlaylist;
