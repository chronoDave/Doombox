import type { Song } from '../../../types/library';
import type { Playlist } from '../../../types/playlist';
import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import { play } from '../../actions/player.actions';
import { deletePlaylist, updatePlaylist } from '../../actions/playlist.actions';
import { setQueue } from '../../actions/queue.actions';
import Icon from '../../components/icon/icon';
import VirtualList from '../../components/virtualList/virtualList';
import cx from '../../utils/cx/cx';

import './playlistDetail.scss';

export type PlaylistDetailProps = {
  current: string | null
  playlist: Playlist
  songs: Map<string, Song>
  oncancel: () => void
};

const PlaylistDetail: Component<PlaylistDetailProps> = () => {
  const component = new forgo.Component<PlaylistDetailProps>({
    render(props) {
      return (
        <section class='PlaylistDetail'>
          <header class='header'>
            <button
              type='button'
              onclick={props.oncancel}
              aria-label='Back to playlist overview'
            >
              <Icon id='chevronLeft' />
            </button>
            <h1 class='title h4'>
              <input
                type='text'
                value={props.playlist.title}
                onchange={event => updatePlaylist({
                  ...props.playlist,
                  title: event.currentTarget.value
                })}
              />
            </h1>
            <div class='actions'>
              <button type='button' onclick={() => setQueue(props.playlist.songs)}>
                <Icon id='listPlay' />
              </button>
              <button
                type='button'
                onclick={() => {
                  props.oncancel();
                  deletePlaylist(props.playlist._id);
                }}
              >
                <Icon id='listDelete' />
              </button>
            </div>
          </header>
          <div class='body'>
            <VirtualList
              data={props.playlist.songs}
              cell={{
                height: () => 52,
                render: (id, i) => {
                  const song = props.songs.get(id);

                  return (
                    <button
                      type='button'
                      class={cx(props.current === id && 'active')}
                      onclick={() => play(id)}
                    >
                      <span>{i}.</span>
                      <dl class='meta'>
                        <dt class='sr-only'>Title</dt>
                        <dd class='nowrap'>{song?.title}</dd>
                        <dt class='sr-only'>Artist</dt>
                        <dd class='small nowrap'>{song?.artist}</dd>
                      </dl>
                    </button>
                  );
                }
              }}
            />
          </div>
        </section>
      );
    }
  });

  return component;
};

export default PlaylistDetail;
