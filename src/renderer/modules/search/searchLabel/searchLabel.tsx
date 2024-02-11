import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import secToTime from '../../../../utils/time/secToTime';
import timeToShort from '../../../../utils/time/timeToShort';
import { playLabel } from '../../../actions/queue.actions';
import VirtualList from '../../../components/virtualList/virtualList';

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
          onclick={playLabel}
          cell={{
            id: label => label._id,
            height: () => 48,
            render: label => (
              <button
                class='SearchLabel'
                type='button'
                data-id={label._id}
              >
                <p class='title nowrap'>{label.label}</p>
                <p class='subtitle nowrap'>{label.albums.length} album{label.albums.length > 1 ? 's' : ''}<span class='glyph dot' />{label.songs.length} track{label.songs.length > 1 ? 's' : ''}<span class='glyph dot' />{timeToShort(secToTime(label.duration ?? 0))}</p>
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
