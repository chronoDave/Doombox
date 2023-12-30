import type { Label } from '../../../types/library';
import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import { playLabel } from '../../actions/queue.actions';
import VirtualList from '../virtualList/virtualList';

import './listLabel.scss';
import Glyph from '../glyph/glyph';
import timeToShort from '../../../utils/time/timeToShort';
import secToTime from '../../../utils/time/secToTime';

export type ListLabelProps = {
  labels: Label[]
};

enum Action {
  PlayLabel = 'play-label'
}

const ListLabel: Component<ListLabelProps> = () => {
  const component = new forgo.Component<ListLabelProps>({
    render(props) {
      return (
        <VirtualList
          data={props.labels}
          onclick={(action, id) => {
            if (action === Action.PlayLabel) playLabel(id);
          }}
          cell={{
            id: cell => cell._id,
            height: () => 48,
            render: cell => (
              <button
                class='ListLabel'
                type='button'
                data-id={cell._id}
                data-action='label-play'
              >
                <p class='title nowrap'>{cell.label}</p>
                <p class='subtitle nowrap'>{cell.albums.length} album{cell.albums.length > 1 ? 's' : ''}<Glyph id='dot' />{cell.songs.length} track{cell.songs.length > 1 ? 's' : ''}<Glyph id='dot' />{timeToShort(secToTime(cell.duration ?? 0))}</p>
              </button>
            )
          }}
        />
      );
    }
  });

  return component;
};

export default ListLabel;
