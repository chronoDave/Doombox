import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import secToTime from '../../../utils/time/secToTime';
import timeToHhMmSs from '../../../utils/time/timeToHhMmSs';
import InputSearch from '../../components/inputSearch/inputSearch';
import VirtualList from '../../components/virtualList/virtualList';
import * as player from '../../state/actions/player.actions';
import { searchSongs } from '../../state/actions/search.actions';
import { thumbSelector } from '../../state/selectors/app.selectors';
import { songSearchSelector } from '../../state/selectors/search.selectors';
import { songSelector, songsSelector } from '../../state/selectors/song.selectors';
import { romajiSelector } from '../../state/selectors/user.selectors';

import './song.view.scss';

export type SongViewProps = {};

const SongView: Component<SongViewProps> = () => {
  const component = new forgo.Component<SongViewProps>({
    render() {
      const search = songSearchSelector.get();
      const songs = (search ?? songsSelector.get());

      return (
        <div class="SongView">
          <h1>All songs</h1>
          <InputSearch
            placeholder='search for song title'
            onsubmit={x => searchSongs(x)}
          />
          <p>{songs.length} songs</p>
          <VirtualList
            list={songs}
            item={{
              height: 42,
              render: id => {
                const song = songSelector.get(id);

                return (
                  <button id={song._id} type='button' onclick={() => player.play(song._id)}>
                    <img
                      width={34}
                      height={34}
                      src={thumbSelector.get(song.image)}
                      alt=''
                      loading='lazy'
                    />
                    <div class='metadata'>
                      <p>{romajiSelector.get(song.title)}</p>
                      <p>{romajiSelector.get(song.artist)}</p>
                    </div>
                    <div class='duration'>
                      <p>{timeToHhMmSs(secToTime(song.duration ?? 0))}</p>
                    </div>
                  </button>
                );
              }
            }}
          />
        </div>
      );
    }
  });

  thumbSelector.subscribe(component);
  songSearchSelector.subscribe(component);
  songSelector.subscribe(component);
  songsSelector.subscribe(component);
  romajiSelector.subscribe(component);

  return component;
};

export default SongView;
