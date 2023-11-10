import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import { setQueue } from '../../../actions/queue.actions';
import Icon from '../../../components/icon/icon';

import subscribe from './libraryPlaylist.state';
import Collapse from '../../../components/collapse/collapse';

import './libraryPlaylist.scss';

export type LibraryPlaylistProps = {};

const LibraryPlaylist: Component<LibraryPlaylistProps> = () => {
  const component = new forgo.Component<LibraryPlaylistProps>({
    render() {
      const playlists = subscribe(component);

      return (
        <div class='LibraryPlaylist'>
          <h1 class='h4'>Playlists</h1>
          <ul>
            {playlists.map(playlist => (
              <li key={playlist._id}>
                <button type='button' onclick={() => setQueue(playlist.songs)}>
                  <p>{playlist.title}</p>
                  <p class='small'>{playlist.songs.length} songs</p>
                </button>
              </li>
            ))}
          </ul>
        </div>
      );
    }
  });

  return component;
};

export default LibraryPlaylist;
