import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import sum from '../../../../utils/array/sum';
import secToTime from '../../../../utils/time/secToTime';
import timeToHhMmSs from '../../../../utils/time/timeToHhMmSs';
import {
  addLabelToQueue,
  playAlbum,
  playLabel,
  setQueue
} from '../../../actions/queue.actions';
import { searchAlbums } from '../../../actions/search.actions';
import Icon from '../../../components/icon/icon';
import VirtualGrid from '../../../components/virtualGrid/virtualGrid';
import cx from '../../../utils/cx/cx';

import subscribe from './libraryAlbums.state';

import './libraryAlbums.scss';

export type LibraryAlbumsProps = {};

enum Action {
  PlayLabel = 'play-label',
  AddLabel = 'add-label',
  PlayAlbum = 'play-album'
}

const LibraryAlbums: Component<LibraryAlbumsProps> = () => {
  const actions: Record<Action, (id: string) => void> = {
    [Action.PlayAlbum]: playAlbum,
    [Action.PlayLabel]: playLabel,
    [Action.AddLabel]: addLabelToQueue
  };

  const isAction = (x?: string): x is Action => {
    if (!x) return false;
    return x in actions;
  };

  const component = new forgo.Component<LibraryAlbumsProps>({
    render() {
      const { labels, current } = subscribe(component);
      const duration = sum(labels, label => label.duration ?? 0);

      return (
        <div class="LibraryAlbums">
          <div class="toolbar">
            <p class='meta'>
              <span><Icon id='boxesMusic' />{labels.length}</span>
              <span><Icon id='stopwatch' />{timeToHhMmSs(secToTime(duration))}</span>
            </p>
            <div class='actions'>
              <button
                type='button'
                onclick={() => setQueue(labels.map(label => label.songs).flat())}
              >
                <Icon id='listPlay' />
              </button>
            </div>
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
              width: cell => 'albums' in cell ? null : 256,
              height: cell => 'albums' in cell ? 48 : 96,
              render: cell => {
                if ('albums' in cell) {
                  return (
                    <article class='label' data-id={cell._id}>
                      <div class='meta'>
                        <p class='nowrap'>{cell.label}</p>
                        <p class='nowrap small'>{cell.albums.length} albums<span class='dot' aria-hidden='true'>&bull;</span>{timeToHhMmSs(secToTime(cell.duration ?? 0))}</p>
                      </div>
                      <div class='actions'>
                        <button type='button' data-action={Action.PlayLabel} aria-label={`Play ${cell.label}`}>
                          <Icon id='listPlay' />
                        </button>
                        <button type='button' data-action={Action.AddLabel} aria-label={`Add ${cell.label} to queue`}>
                          <Icon id='listAdd' />
                        </button>
                      </div>
                      <span class='hr' />
                    </article>
                  );
                }
                return (
                  <article
                    data-id={cell._id}
                    class={cx('album', (current && cell.songs.includes(current)) && 'active')}
                  >
                    <button type='button' data-action={Action.PlayAlbum} aria-label={`Play ${cell.album}`}>
                      <img src={cell.image} alt='' width={96} height={96} />
                    </button>
                    <div class='meta'>
                      <p>{cell.album}</p>
                      <p class='small'>{cell.albumartist ?? '-'}</p>
                    </div>
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
    searchAlbums('');
  });

  return component;
};

export default LibraryAlbums;
