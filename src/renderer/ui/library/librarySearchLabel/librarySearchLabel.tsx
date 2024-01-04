import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import secToTime from '../../../../utils/time/secToTime';
import timeToShort from '../../../../utils/time/timeToShort';
import { playLabel } from '../../../actions/queue.actions';
import Glyph from '../../../components/glyph/glyph';
import VirtualList from '../../../components/virtualList/virtualList';

import subscribe from './librarySearchLabel.state';

import './librarySearchLabel.scss';

export type SearchLabelProps = {};

const SearchLabel: Component<SearchLabelProps> = () => {
  const component = new forgo.Component<SearchLabelProps>({
    render() {
      const labels = subscribe(component);

      if (labels.length === 0) return <p>No labels found</p>;
      return (
        <VirtualList
          data={labels}
          onclick={data => data.id && playLabel(data.id)}
          cell={{
            id: label => label._id,
            height: () => 48,
            render: label => (
              <button
                class='LibrarySearchLabel'
                type='button'
                data-id={label._id}
              >
                <p class='title nowrap'>{label.label}</p>
                <p class='subtitle nowrap'>{label.albums.length} album{label.albums.length > 1 ? 's' : ''}<Glyph id='dot' />{label.songs.length} track{label.songs.length > 1 ? 's' : ''}<Glyph id='dot' />{timeToShort(secToTime(label.duration ?? 0))}</p>
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
