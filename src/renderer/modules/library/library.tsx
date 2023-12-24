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
