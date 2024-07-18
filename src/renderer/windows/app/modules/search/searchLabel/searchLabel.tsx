import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import VirtualList from '@doombox/components/virtual-list/virtual-list';
import Time from '@doombox/lib/time/time';

import { addLabelToQueue, playLabel } from '../../../state/actions/queue.actions';

import subscribe from './searchLabel.state';

import './searchLabel.scss';

export type SearchLabelProps = {};

const SearchLabel: Component<SearchLabelProps> = () => {
  const component = new forgo.Component<SearchLabelProps>({
    render() {
      const labels = subscribe('SearchLabel', component);

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
                class='SearchLabel'
                type='button'
                data-id={label._id}
              >
                <p class='title nowrap'>{label.label}</p>
                <dl class='horizontal'>
                  <div>
                    <dd>Album(s)</dd>
                    <dd>{label.albums.length}</dd>
                  </div>
                  <div>
                    <dt>Track(s)</dt>
                    <dd>{label.songs.length}</dd>
                  </div>
                  <div>
                    <dt class='sr-only'>Duration</dt>
                    <dd>{new Time(label.duration ?? 0).toShort()}</dd>
                  </div>
                </dl>
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
