import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import { playAlbum, playLabel } from '../../actions/queue.actions';
import VirtualGrid from '../../components/virtualGrid/virtualGrid';

import subscribe from './library.state';
import LibraryAlbum from './libraryAlbum/libraryAlbum';
import LibraryLabel from './libraryLabel/libraryLabel';

export type LibraryProps = {};

enum Action {
  PlayLabel = 'play-label',
  PlayAlbum = 'play-album'
}

const Library: Component<LibraryProps> = () => {
  const component = new forgo.Component<LibraryProps>({
    render() {
      const state = subscribe(component);

      return (
        <VirtualGrid
          data={state.data}
          onclick={data => {
            if (data.id && data.action === Action.PlayAlbum) playAlbum(data.id);
            if (data.id && data.action === Action.PlayLabel) playLabel(data.id);
          }}
          cell={{
            id: cell => cell._id,
            width: cell => 'albums' in cell ? null : 72,
            height: cell => 'albums' in cell ? 40 : null,
            render: cell => {
              if ('albums' in cell) {
                return (
                  <LibraryLabel
                    action={Action.PlayLabel}
                    label={cell}
                    current={state.current}
                  />
                );
              }
              return (
                <LibraryAlbum
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

export default Library;
