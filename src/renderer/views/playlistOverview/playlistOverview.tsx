import type { Playlist } from '../../../types/playlist';
import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import './playlistOverview.scss';

export type PlaylistOverviewProps = {
  playlists: Playlist[]
  onclick: (playlist: Playlist) => void
};

const PlaylistOverview: Component<PlaylistOverviewProps> = () => {
  const component = new forgo.Component<PlaylistOverviewProps>({
    render(props) {
      return (
        <section class='PlaylistOverview'>
          <header class='header'>
            <h1 class='h3'>Playlists</h1>
          </header>
          <div class='body'>
            <ul>
              {props.playlists.map(playlist => (
                <li key={playlist._id}>
                  <button type='button' onclick={() => props.onclick(playlist)}>
                    <p>{playlist.title}</p>
                    <p>{playlist.songs.length} songs</p>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </section>
      );
    }
  });

  return component;
};

export default PlaylistOverview;
