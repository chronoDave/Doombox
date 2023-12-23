import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import sum from '../../../utils/array/sum';
import secToTime from '../../../utils/time/secToTime';
import timeToShort from '../../../utils/time/timeToShort';
import {
  addLabelToQueue,
  playAlbum,
  playLabel
} from '../../actions/queue.actions';
import { search } from '../../actions/library.actions';
import VirtualGrid from '../../components/virtualGrid/virtualGrid';
import cx from '../../utils/cx/cx';
import InputSearch from '../../components/inputSearch/inputSearch';
import Glyph from '../../components/glyph/glyph';

import subscribe from './library.state';

import './library.scss';

export type LibraryProps = {};

enum Action {
  PlayLabel = 'play-label',
  AddLabel = 'add-label',
  PlayAlbum = 'play-album'
}

const Library: Component<LibraryProps> = () => {
  const actions: Record<Action, (id: string) => void> = {
    [Action.PlayAlbum]: playAlbum,
    [Action.PlayLabel]: playLabel,
    [Action.AddLabel]: addLabelToQueue
  };

  const isAction = (x?: string): x is Action => {
    if (!x) return false;
    return x in actions;
  };

  const component = new forgo.Component<LibraryProps>({
    render() {
      const { labels, current } = subscribe(component);
      // const duration = sum(labels, label => label.duration ?? 0);

      return (
        <div class="Library">
          <div class="search">
            <InputSearch
              placeholder='Search...'
              onsubmit={search}
            />
          </div>
          <VirtualGrid
            data={labels.map(label => [label, ...label.albums]).flat()}
            onclick={source => {
              const action = source.closest<HTMLButtonElement>('[data-action]')?.dataset.action;
              const id = source.closest<HTMLElement>('[data-id]')?.dataset.id;

              if (isAction(action) && id) actions[action](id);
            }}
            cell={{
              id: cell => cell._id,
              width: cell => 'albums' in cell ? null : 72,
              height: cell => 'albums' in cell ? 48 : 72,
              render: cell => {
                if ('albums' in cell) {
                  return (
                    <button
                      type='button'
                      class='label'
                      data-id={cell._id}
                      data-action={Action.PlayLabel}
                      aria-label={`Play ${cell.label}`}
                    >
                      <div class='meta'>
                        <p class='nowrap'>{cell.label}</p>
                        <p class='nowrap small'>{cell.albums.length} albums<Glyph id='dot' />{cell.songs.length} tracks<Glyph id='dot' />{timeToShort(secToTime(cell.duration ?? 0))}</p>
                      </div>
                      <span class='hr' />
                    </button>
                  );
                }
                return (
                  <article
                    data-id={cell._id}
                    class={cx('album', (current && cell.songs.includes(current)) && 'active')}
                  >
                    <button type='button' data-action={Action.PlayAlbum} aria-label={`Play ${cell.album}`}>
                      <img src={cell.image} alt='' width={72} height={72} />
                    </button>
                  </article>
                );
              }
            }}
          />
        </div>
      );
    }
  });

  component.unmount(() => {
    search('');
  });

  return component;
};

export default Library;
