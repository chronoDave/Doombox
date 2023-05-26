import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import { Thumb } from '../../../types/library';
import secToTime from '../../../utils/time/secToTime';
import timeToHhMmSs from '../../../utils/time/timeToHhMmSs';
import Icon from '../../components/icon/icon';
import InputSearch from '../../components/inputSearch/inputSearch';
import VirtualList from '../../components/virtualList/virtualList';
import useMediaQuery from '../../hooks/useMediaQuery';
import * as player from '../../state/actions/player.actions';
import { addToQueue, setQueue } from '../../state/actions/queue.actions';
import { searchSongs } from '../../state/actions/search.actions';
import { thumbSelector } from '../../state/selectors/app.selectors';
import { playerIdSelector } from '../../state/selectors/player.selectors';
import { songSearchSelector } from '../../state/selectors/search.selectors';
import { songSelector, songsSelector } from '../../state/selectors/song.selectors';
import { romajiSelector } from '../../state/selectors/user.selectors';
import cx from '../../utils/cx/cx';
import createMediaQuery from '../../utils/mediaQuery';

import './song.view.scss';

export type SongViewProps = {};

const SongView: Component<SongViewProps> = () => {
  let height = 42;

  const component = new forgo.Component<SongViewProps>({
    render() {
      const search = songSearchSelector.get();
      const songs = (search ?? songsSelector.get());
      const duration = songs
        .reduce((acc, cur) => acc + (songSelector.get(cur).duration ?? 0), 0);

      return (
        <div class="View SongView">
          <h1 class='sr-only'>Song view</h1>
          <InputSearch
            placeholder='search for songs'
            onsubmit={x => searchSongs(x)}
          />
          <div class='toolbar'>
            <p class='status'>
              <span><Icon id='musicNote' />{songs.length}</span>
              <span><Icon id='stopwatch' />{timeToHhMmSs(secToTime(duration))}</span>
            </p>
            <div class='actions'>
              <button type='button' onclick={() => setQueue(songs)}>
                <Icon id='playlistPlay' />
              </button>
              <button type='button' onclick={() => addToQueue(songs)}>
                <Icon id='playlistAdd' />
              </button>
            </div>
          </div>
          <VirtualList
            list={songs}
            item={{
              height,
              render: id => {
                const song = songSelector.get(id);

                return (
                  <button
                    id={song._id}
                    type='button'
                    onclick={() => player.play(song._id)}
                    class={cx(id === playerIdSelector.get() && 'active')}
                  >
                    <img
                      width={Thumb.Song}
                      height={Thumb.Song}
                      src={thumbSelector.get(Thumb.Song, song.image)}
                      alt=''
                      loading='lazy'
                    />
                    <div class='metadata'>
                      <p class='title'>{romajiSelector.get(song.title)}</p>
                      <p class='artist'>{romajiSelector.get(song.artist)}</p>
                      <p class='album'>{romajiSelector.get(song.album)}</p>
                    </div>
                    <div class='duration'>
                      <p>{timeToHhMmSs(secToTime(song.duration ?? 0))}</p>
                    </div>
                  </button>
                );
              }
            }}
          />
        </div >
      );
    }
  });

  component.unmount(() => {
    searchSongs('');
  });

  useMediaQuery([
    createMediaQuery({ axis: 'min-width', breakpoint: 'xs-w' }, { axis: 'min-height', breakpoint: 'xs-h' }),
    createMediaQuery({ axis: 'min-width', breakpoint: 'sm-w' }, { axis: 'min-height', breakpoint: 'sm-h' }),
    createMediaQuery({ axis: 'min-width', breakpoint: 'md-w' }, { axis: 'min-height', breakpoint: 'md-h' })
  ])(i => {
    height = 42 + i * 12;
  })(component);

  songSearchSelector.subscribe(component);
  songSelector.subscribe(component);
  songsSelector.subscribe(component);
  romajiSelector.subscribe(component);
  playerIdSelector.subscribe(component);
  thumbSelector.subscribe(component);

  return component;
};

export default SongView;
