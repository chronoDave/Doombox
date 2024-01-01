import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import { playAlbum, playLabel } from '../../../actions/queue.actions';
import VirtualGrid from '../../../components/virtualGrid/virtualGrid';

import subscribe from './libraryGrid.state';
import LibraryGridAlbum from './libraryGridAlbum/libraryGridAlbum';
import LibraryGridLabel from './libraryGridLabel/libraryGridLabel';

export type GridLabelProps = {};

enum Action {
  PlayLabel = 'play-label',
  PlayAlbum = 'play-album'
}

const GridLabel: Component<GridLabelProps> = () => {
  const component = new forgo.Component<GridLabelProps>({
    render() {
      const state = subscribe(component);

      return (
        <VirtualGrid
          data={state.labels.map(label => [label, ...label.albums]).flat()}
          onclick={data => {
            if (data.id && data.action === Action.PlayAlbum) playAlbum(data.id);
            if (data.id && data.action === Action.PlayLabel) playLabel(data.id);
          }}
          cell={{
            id: cell => cell._id,
            width: cell => 'albums' in cell ? null : 72,
            height: cell => 'albums' in cell ? 48 : null,
            render: cell => {
              if ('albums' in cell) return <LibraryGridLabel action={Action.PlayLabel} label={cell} />;
              return (
                <LibraryGridAlbum
                  action={Action.PlayAlbum}
                  album={cell}
                  current={state.current}
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
