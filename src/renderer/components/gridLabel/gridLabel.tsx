import type { Album, Label } from '../../../types/library';
import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import { playAlbum, playLabel } from '../../actions/queue.actions';
import VirtualGrid from '../virtualGrid/virtualGrid';

import GridLabelAlbum from './gridLabelAlbum/gridLabelAlbum';
import GridLabelHeader from './gridLabelHeader/gridLabelHeader';

export type GridLabelProps = {
  labels: Array<Label<Album & { image: string }>>
  current?: string
};

enum Action {
  PlayLabel = 'play-label',
  PlayAlbum = 'play-album'
}

const GridLabel: Component<GridLabelProps> = () => {
  const component = new forgo.Component<GridLabelProps>({
    render(props) {
      return (
        <VirtualGrid
          data={props.labels.map(label => [label, ...label.albums]).flat()}
          onclick={(action, id) => {
            if (action === Action.PlayAlbum) playAlbum(id);
            if (action === Action.PlayLabel) playLabel(id);
          }}
          cell={{
            id: cell => cell._id,
            width: cell => 'albums' in cell ? null : 72,
            height: cell => 'albums' in cell ? 48 : 72,
            render: cell => {
              if ('albums' in cell) return <GridLabelHeader onclick={Action.PlayLabel} label={cell} />;
              return (
                <GridLabelAlbum
                  onclick={Action.PlayAlbum}
                  album={cell}
                  current={props.current}
                />
              );
            }
          }}
        />
      );
    }
  });

  return component;
};

export default GridLabel;
