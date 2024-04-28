import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import VirtualList from '@doombox/components/virtualList/virtualList';
import Time from '@doombox/lib/time/time';

import { addLabelToQueue, playLabel } from '../../../actions/queue.actions';

import subscribe from './searchLabel.state';

import './searchLabel.scss';

export type SearchLabelProps = {};

const SearchLabel: Component<SearchLabelProps> = () => {
  const component = new forgo.Component<SearchLabelProps>({
    render() {
      const labels = subscribe(component);

      if (labels.length === 0) return <p>No labels found</p>;
      return (
        <VirtualList
          data={labels}
          onclick={(id, event) => {
            if (event.shiftKey) {
              addLabelToQueue(id);
            } else {
              playLabel(id);
            }
          }}
          cell={{
            id: label => label._id,
            height: () => 48,
            render: ({ data: label }) => (
              <button
                class='SearchLabel button'
                type='button'
                data-id={label._id}
              >
                <p class='title nowrap'>{label.label}</p>
                <p class='subtitle nowrap'>{label.albums.length} album{label.albums.length > 1 ? 's' : ''}<span class='glyph dot' />{label.songs.length} track{label.songs.length > 1 ? 's' : ''}<span class='glyph dot' />{new Time(label.duration ?? 0).toShort()}</p>
              </button>
            )
          }}
        />
      );
    }
  });

  return component;
};

export default SearchLabel;
