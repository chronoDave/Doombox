import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import Time from '../../../../../lib/time/time';
import VirtualList from '../../../../components/virtualList/virtualList';
import { playLabel } from '../../../actions/queue.actions';

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
